import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: "Product", index: true })
  product_id: Types.ObjectId;

  @Prop()
  author: string;

  @Prop()
  rating: number;

  @Prop()
  text: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
