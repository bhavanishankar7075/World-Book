import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Navigation extends Document {
  @Prop()
  title: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  last_scraped_at: Date;
}

export const NavigationSchema = SchemaFactory.createForClass(Navigation);
