import { Controller, Post, Body } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ViewHistory } from "./history.schema";

@Controller("history")
export class HistoryController {
  constructor(@InjectModel(ViewHistory.name) private model: Model<ViewHistory>) { }

  @Post()
  async save(@Body() body: { path: string }) {
    return this.model.create({
      session_id: "guest",
      path: body.path,
    });
  }
}
