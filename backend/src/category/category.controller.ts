import { Controller, Get, Query, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./category.schema";
import { Product } from "../product/product.schema";

@Controller("category")
export class CategoryController {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  @Get()
  async getBySlug(@Query("slug") slug: string) {
    console.log("🔎 CATEGORY SLUG SEARCH =>", slug);

    if (!slug) throw new NotFoundException("Slug not provided");

    const category = await this.categoryModel.findOne({ slug });
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);

    const products = await this.productModel.find({
      category_id: category._id,
    });

    return { category, products };
  }
}
