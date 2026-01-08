import { Controller, Get } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../product/product.schema";
import { Category } from "../category/category.schema";
import { ScrapeJob, ScrapeJobDocument } from "../scrape/scrape-job.schema";

@Controller("analytics")
export class AnalyticsController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(ScrapeJob.name) private jobModel: Model<ScrapeJobDocument>,
  ) { }

  @Get()
  async getStats() {
    const [totalProducts, totalCategories, lastJob] = await Promise.all([
      this.productModel.countDocuments(),
      this.categoryModel.countDocuments(),
      this.jobModel.findOne().sort({ createdAt: -1 })
    ]);

    const avg = totalCategories
      ? (totalProducts / totalCategories).toFixed(2)
      : 0;

    return {
      totalProducts,
      totalCategories,
      avgProductsPerCategory: avg,
      lastScrapeTime: lastJob?.createdAt || null
    };
  }
}
