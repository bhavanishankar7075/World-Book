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

  private async safeGoto(page, url: string) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
    await page.waitForTimeout(3000);
  }

  // ================= NAVIGATION =================
  async scrapeNavigation(): Promise<NavItem[]> {
    const browser = await chromium.launch({ headless: true, timeout: 0 });
    const page = await browser.newPage();

    try {
      await this.safeGoto(page, "https://www.worldofbooks.com/");

      const navs: NavItem[] = await page.evaluate(() => {
        const list: NavItem[] = [];
        document.querySelectorAll<HTMLAnchorElement>('a[href*="/collections/"]').forEach(el => {
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
        await this.navModel.updateOne(
          { slug: nav.slug },
          { title: nav.title, slug: nav.slug, last_scraped_at: new Date() },
          { upsert: true }
        );
      }

      await browser.close();
      return navs;
    } catch (e) {
      await browser.close();
      throw e;
    }
  }

  // ================= CATEGORY =================
  async scrapeCategory(url: string, navigationId: Types.ObjectId): Promise<CategoryItem[]> {
    const browser = await chromium.launch({ headless: true, timeout: 0 });
    const page = await browser.newPage();

    try {
      await this.safeGoto(page, `https://www.worldofbooks.com/en-gb/${url}`);

      const categories: CategoryItem[] = await page.evaluate(() => {
        const list: CategoryItem[] = [];
        document.querySelectorAll<HTMLAnchorElement>('a[href*="/collections/"]').forEach(el => {
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
        await this.categoryModel.updateOne(
          { slug: cat.slug },
          {
            title: cat.title,
            slug: cat.slug,
            navigation_id: navigationId,
            last_scraped_at: new Date(),
          },
          { upsert: true }
        );
      }

      await browser.close();
      return categories;
    } catch (e) {
      await browser.close();
      throw e;
    }
  }
async scrapeProducts(url: string, categoryId: Types.ObjectId): Promise<ProductItem[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const fullUrl = `https://www.worldofbooks.com/en-gb/${url}`;
    console.log("🛒 SCRAPING PRODUCTS =>", fullUrl);

    await page.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4000);

    // Scroll multiple times for lazy loading
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 3000);
      await page.waitForTimeout(2000);
    }

    const products: ProductItem[] = await page.evaluate(() => {
      const items: any[] = [];

      document.querySelectorAll('[data-product-id]').forEach(el => {
        const link = el.querySelector<HTMLAnchorElement>("a")?.href;
        const title = el.querySelector("h2,h3,h4")?.textContent?.trim();
        const price = el.querySelector('[class*="price"]')?.textContent?.trim();
        const img = el.querySelector<HTMLImageElement>("img")?.src;

        if (!link || !title) return;

        items.push({
          title,
          slug: link.split("/").pop() || "",
          source_url: link,
          image_url: img || "",
          price: price || "",
        });
      });

      return items;
    });

    console.log(`✅ FOUND ${products.length} PRODUCTS`);

    for (const p of products) {
      await this.productModel.updateOne(
        { slug: p.slug },
        {
          ...p,
          category_id: categoryId,
          last_scraped_at: new Date(),
        },
        { upsert: true }
      );
    }

    await browser.close();
    return products;

  } catch (e) {
    await browser.close();
    throw e;
  }
}


 async runFullScrapePipeline() {
  console.log("🔥 SAFE FULL SCRAPE STARTED");

  // 1️⃣ NAVIGATION — scrape only once
  const navCount = await this.navModel.countDocuments();
  if (navCount === 0) {
    console.log("📌 Scraping navigation...");
    await this.scrapeNavigation();
  } else {
    console.log("⏭ Navigation already exists. Skipping...");
  }

  const navs = await this.navModel.find();

  // 2️⃣ CATEGORIES — scrape only missing
  for (const nav of navs) {
    const catExists = await this.categoryModel.exists({ navigation_id: nav._id });

    if (!catExists) {
      console.log(`📌 Scraping categories for ${nav.slug}`);
      await this.scrapeCategory(nav.slug, nav._id);
      await this.delay(4000);
    } else {
      console.log(`⏭ Categories already exist for ${nav.slug}`);
    }
  }

  // 3️⃣ PRODUCTS — scrape only empty categories
  const categories = await this.categoryModel.find();

  for (const cat of categories) {
    if (cat.product_count > 0) {
      console.log(`⏭ Products already exist for ${cat.slug}`);
      continue;
    }

    console.log(`📌 Scraping products for ${cat.slug}`);
    const products = await this.scrapeProducts(cat.slug, cat._id);

    await this.categoryModel.updateOne(
      { _id: cat._id },
      { product_count: products.length }
    );

    await this.delay(5000);
  }

  console.log("🎉 SAFE FULL SCRAPE COMPLETED");
  return { success: true };
}

}
