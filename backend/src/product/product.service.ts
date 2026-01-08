import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Product } from "./product.schema";
import { ProductDetail } from "../product-detail/product-detail.schema";
import { Review } from "../review/review.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductDetail.name) private detailModel: Model<ProductDetail>,
    @InjectModel(Review.name) private reviewModel: Model<Review>
  ) {}

  async getProductBySlug(slug: string) {
    const product = await this.productModel.findOne({ slug });
    if (!product) return null;

    const productId = product._id as Types.ObjectId;

    const detail = await this.detailModel.findOne({ product_id: productId });
    const reviews = await this.reviewModel.find({ product_id: productId });

    const related = await this.productModel
      .find({
        category_id: product.category_id,
        _id: { $ne: productId },
      })
      .limit(4);

    return {
      ...product.toObject(),
      description: detail?.description || "",
      ratings_avg: detail?.ratings_avg || 0,
      reviews_count: detail?.reviews_count || 0,
      specs: detail?.specs || {},
      reviews,
      related: related.map(p => ({
        title: p.title,
        slug: p.slug,
        image_url: p.image_url,
        price: p.price,
      })),
    };
  }

  async searchProducts(
    q = "",
    page = 1,
    limit = 20,
    sort = "latest"
  ) {
    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { author: { $regex: q, $options: "i" } },
            { source_id: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    let sortQuery: any = { last_scraped_at: -1 };

    if (sort === "price_low") sortQuery = { price: 1 };
    if (sort === "price_high") sortQuery = { price: -1 };
    if (sort === "az") sortQuery = { title: 1 };
    if (sort === "za") sortQuery = { title: -1 };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.productModel
        .find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit),
      this.productModel.countDocuments(filter),
    ]);

    return {
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
