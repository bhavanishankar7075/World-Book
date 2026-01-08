import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ScrapeJobDocument = ScrapeJob & Document & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class ScrapeJob extends Document {
  @Prop({ index: true })
  target_url: string;

  @Prop({ index: true })
  target_type: string;

  @Prop({ default: "pending", index: true })
  status: string;

  @Prop()
  error_log: string;

  @Prop()
  started_at: Date;

  @Prop()
  finished_at: Date;
}

export const ScrapeJobSchema = SchemaFactory.createForClass(ScrapeJob);
