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
  ) { }

  async getProductBySlug(slug: string) {
    const product = await this.productModel.findOne({ slug });
    if (!product) return null;

    const productId = product._id as Types.ObjectId;

    const detail = await this.detailModel.findOne({ product_id: productId });
    const reviews = await this.reviewModel.find({ product_id: productId });

    const author = detail?.specs?.author || "";
    const keywords = product.title.split(" ").slice(0, 3).join("|");

    const related = await this.productModel.aggregate([
      {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "product_id",
          as: "detail"
        }
      },
      { $unwind: { path: "$detail", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          _id: { $ne: productId },
          $or: [
            { category_id: product.category_id },
            { "detail.specs.author": author },
            { title: { $regex: keywords, $options: "i" } }
          ]
        }
      },
      { $limit: 4 }
    ]);

    return {
      ...product.toObject(),
      description: detail?.description || "",
      ratings_avg: detail?.ratings_avg || 0,
      reviews_count: detail?.reviews_count || 0,
      specs: detail?.specs || {},
      reviews,
      related: related.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        image_url: p.image_url,
        price: p.price,
      })),
    };
  }


  async searchProducts(q = "", page = 1, limit = 20, sort = "latest") {

    const skip = (page - 1) * limit;

    const match: any = {};

    if (q) {
      match.$or = [
        { title: { $regex: q, $options: "i" } },
        { "detail.specs.author": { $regex: q, $options: "i" } },
        { "detail.specs.publisher": { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
      ];
    }

    const sortQuery: any =
      sort === "price_low" ? { price: 1 } :
        sort === "price_high" ? { price: -1 } :
          sort === "az" ? { title: 1 } :
            sort === "za" ? { title: -1 } :
              { last_scraped_at: -1 };

    const pipeline: any[] = [
      {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "product_id",
          as: "detail"
        }
      },
      {
        $unwind: {
          path: "$detail",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: match },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit }
    ];

    const [products, total] = await Promise.all([
      this.productModel.aggregate(pipeline),
      this.productModel.countDocuments(match)
    ]);

    return {
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

}
