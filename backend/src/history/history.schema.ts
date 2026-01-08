import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class ViewHistory extends Document {
  @Prop()
  session_id: string;

  @Prop()
  path: string;
}

export const ViewHistorySchema = SchemaFactory.createForClass(ViewHistory);
