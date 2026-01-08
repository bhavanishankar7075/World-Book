import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AnalyticsController } from "./analytics.controller";
import { Product, ProductSchema } from "../product/product.schema";
import { Category, CategorySchema } from "../category/category.schema";
import { ScrapeJob, ScrapeJobSchema } from "../scrape/scrape-job.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: ScrapeJob.name, schema: ScrapeJobSchema },
    ])
  ],
  controllers: [AnalyticsController],
})
export class AnalyticsModule { }
