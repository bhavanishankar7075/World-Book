import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ScrapeService } from "./scrape.service";
import { ScrapeController } from "./scrape.controller";
import { Navigation, NavigationSchema } from "../navigation/navigation.schema";
import { Category, CategorySchema } from "../category/category.schema";
import { Product, ProductSchema } from "../product/product.schema";
import { ProductDetail, ProductDetailSchema } from "../product-detail/product-detail.schema";
import { ScrapeJob, ScrapeJobSchema } from "./scrape-job.schema";
import { ReviewModule } from "../review/review.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Navigation.name, schema: NavigationSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: ScrapeJob.name, schema: ScrapeJobSchema },
    ]),
    ReviewModule,
  ],
  controllers: [ScrapeController],
  providers: [ScrapeService],
})
export class ScrapeModule {}
