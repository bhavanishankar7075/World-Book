import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ type: Types.ObjectId, ref: "Navigation", required: true })
  navigation_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Category", default: null })
  parent_id: Types.ObjectId | null;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 0 })
  product_count: number;

  @Prop()
  last_scraped_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
