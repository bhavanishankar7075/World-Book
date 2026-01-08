import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./product.schema";
import { ProductDetail, ProductDetailSchema } from "../product-detail/product-detail.schema";
import { Review, ReviewSchema } from "../review/review.schema";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
