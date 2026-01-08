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
  ) { }

  @Get()
  async getBySlug(
    @Query("slug") slug: string,
    @Query("page") page = "1",
    @Query("limit") limit = "20",
    @Query("sortBy") sortBy = "createdAt",
    @Query("order") order = "desc"
  ) {
    console.log("🔎 CATEGORY SLUG SEARCH =>", slug, "PAGE =>", page);

    if (!slug) throw new NotFoundException("Slug not provided");

    const category = await this.categoryModel.findOne({ slug });
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);

    const p = Number(page);
    const l = Number(limit);
    const skip = (p - 1) * l;

    // Created sort object (e.g., { price: 1 } or { createdAt: -1 })
    const sortObj: any = {};
    sortObj[sortBy] = order === "desc" ? -1 : 1;

    const [products, total] = await Promise.all([
      this.productModel
        .find({ category_id: category._id })
        .sort(sortObj)
        .skip(skip)
        .limit(l),
      this.productModel.countDocuments({ category_id: category._id })
    ]);

    return {
      category,
      products,
      total,
      page: p,
      pages: Math.ceil(total / l)
    };
  }
}