import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class ProductDetail extends Document {
  @Prop({ type: Types.ObjectId, ref: "Product", unique: true, index: true })
  product_id: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: Object })
  specs: {
    publisher?: string;
    isbn?: string;
    publish_date?: string;
    author?: string;
  };


  @Prop()
  ratings_avg: number;

  @Prop()
  reviews_count: number;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
