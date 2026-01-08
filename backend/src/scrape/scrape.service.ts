import { Injectable } from "@nestjs/common";
import { chromium } from "playwright";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Navigation } from "../navigation/navigation.schema";
import { Category } from "../category/category.schema";
import { Product } from "../product/product.schema";
import { ProductDetail } from "../product-detail/product-detail.schema";
import { ScrapeJob } from "./scrape-job.schema";
import { Review } from "../review/review.schema";

type NavItem = { title: string; slug: string };
type CategoryItem = { title: string; slug: string };
type ProductItem = {
  title: string;
  slug: string;
  source_url: string;
  image_url?: string;
  price?: string;
};

@Injectable()
export class ScrapeService {
  constructor(
    @InjectModel(Navigation.name) private navModel: Model<Navigation>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductDetail.name) private productDetailModel: Model<ProductDetail>,
    @InjectModel(ScrapeJob.name) private jobModel: Model<ScrapeJob>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) {}

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private normalizeSlug(slug: string) {
    return slug.toLowerCase().replace(/\/+$/, "").trim();
  }

  // ================= NAVIGATION =================
  async scrapeNavigation(): Promise<NavItem[]> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto("https://www.worldofbooks.com/", { waitUntil: "domcontentloaded", timeout: 0 });

      const navs: NavItem[] = await page.evaluate(() => {
        const list: NavItem[] = [];
        document.querySelectorAll('a[href*="/collections/"]').forEach(el => {
          const href = el.getAttribute("href");
          const text = el.textContent?.trim();
          if (!href || !text) return;
          let slug = href.replace("https://www.worldofbooks.com/", "").replace(/^\//, "");
          slug = slug.replace(/^[a-z]{2}-[a-z]{2}\//, "");
          if (slug.startsWith("collections/") && !list.some(l => l.slug === slug)) {
            list.push({ title: text, slug });
          }
        });
        return list;
      });

      for (const nav of navs) {
        await this.navModel.updateOne({ slug: nav.slug }, { ...nav, last_scraped_at: new Date() }, { upsert: true });
      }

      return navs;
    } finally {
      await browser.close();
    }
  }

  // ================= CATEGORY =================
  async scrapeCategory(url: string, navigationId: Types.ObjectId): Promise<CategoryItem[]> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto(`https://www.worldofbooks.com/en-gb/${url}`, { waitUntil: "domcontentloaded", timeout: 0 });

      const categories: CategoryItem[] = await page.evaluate(() => {
        const list: CategoryItem[] = [];
        document.querySelectorAll('a[href*="/collections/"]').forEach(el => {
          const href = el.getAttribute("href");
          const text = el.textContent?.trim();
          if (!href || !text) return;
          let slug = href.replace("https://www.worldofbooks.com/", "").replace(/^\//, "");
          slug = slug.replace(/^[a-z]{2}-[a-z]{2}\//, "");
          if (slug.startsWith("collections/") && !list.some(c => c.slug === slug)) {
            list.push({ title: text, slug });
          }
        });
        return list;
      });

      for (const cat of categories) {
        cat.slug = this.normalizeSlug(cat.slug);
        await this.categoryModel.updateOne(
          { slug: cat.slug },
          { ...cat, navigation_id: navigationId, last_scraped_at: new Date() },
          { upsert: true }
        );
      }

      return categories;
    } finally {
      await browser.close();
    }
  }

  // ================= PRODUCTS =================
  async scrapeProducts(url: string, categoryId: Types.ObjectId): Promise<ProductItem[]> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto(`https://www.worldofbooks.com/en-gb/${url}`, { waitUntil: "domcontentloaded", timeout: 0 });
      await page.waitForTimeout(4000);

      const products: ProductItem[] = await page.evaluate(() => {
        const items: any[] = [];
        document.querySelectorAll('[data-product-id]').forEach(el => {
          const link = el.querySelector("a")?.href;
          const title = el.querySelector("h2,h3,h4")?.textContent?.trim();
          const price = el.querySelector('[class*="price"]')?.textContent?.trim();
          const img = el.querySelector("img")?.src;
          if (link && title) items.push({ title, slug: link.split("/").pop(), source_url: link, image_url: img, price });
        });
        return items;
      });

      for (const p of products) {
        await this.productModel.updateOne({ slug: p.slug }, { ...p, category_id: categoryId }, { upsert: true });
      }

      return products;
    } finally {
      await browser.close();
    }
  }

  async scrapeMissingProductDetails() {
    const products = await this.productModel.find();
    let count = 0;
    for (const p of products) {
      const exists = await this.productDetailModel.exists({ product_id: p._id });
      if (!exists && count < 10) {
        await this.scrapeProductDetail(p);
        await this.delay(8000);
        count++;
      }
    }
    return { success: true, processed: count };
  }

  async recalcCategoryCounts() {
    const categories = await this.categoryModel.find();
    for (const cat of categories) {
      const count = await this.productModel.countDocuments({ category_id: cat._id });
      await this.categoryModel.updateOne({ _id: cat._id }, { product_count: count });
    }
    return { success: true };
  }

  async scrapeProductDetail(product: Product) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto(product.source_url, { waitUntil: "domcontentloaded", timeout: 0 });
      await page.waitForTimeout(5000);

      const metaDesc = await page.evaluate(() =>
        document.querySelector('meta[name="description"]')?.getAttribute("content") || ""
      );

      await this.productDetailModel.updateOne(
        { product_id: product._id },
        { description: metaDesc, specs: {}, ratings_avg: 0, reviews_count: 0 },
        { upsert: true }
      );
    } finally {
      await browser.close();
    }
  }



  async runFullScrapePipeline() {
  console.log("🔥 FULL SCRAPE PIPELINE STARTED");

  const navCount = await this.navModel.countDocuments();
  if (navCount === 0) {
    console.log("📌 Scraping navigation...");
    await this.scrapeNavigation();
  }

  const navs = await this.navModel.find();

  for (const nav of navs) {
    const exists = await this.categoryModel.exists({ navigation_id: nav._id });
    if (!exists) {
      console.log(`📌 Scraping categories for ${nav.slug}`);
      await this.scrapeCategory(nav.slug, nav._id);
      await this.delay(4000);
    }
  }

  const categories = await this.categoryModel.find();

  for (const cat of categories) {
    if (cat.product_count > 0) continue;

    console.log(`📌 Scraping products for ${cat.slug}`);
    const products = await this.scrapeProducts(cat.slug, cat._id);
    await this.categoryModel.updateOne(
      { _id: cat._id },
      { product_count: products.length }
    );
    await this.delay(5000);
  }

  return { success: true };
}

}
