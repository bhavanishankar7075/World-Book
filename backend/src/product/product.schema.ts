import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: false })
  category_id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Navigation', required: false })
  navigation_id?: Types.ObjectId;

  @Prop({ index: true })
  source_id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  price: string;

  @Prop()
  currency: string;

  @Prop()
  image_url: string;

  @Prop({ index: true, unique: true })
  source_url: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  last_scraped_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
