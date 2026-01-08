import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../product/product.schema";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async getCategoryProducts(slug: string) {
    const products = await this.productModel.find({ categorySlug: slug });
    return { products };
  }
}
