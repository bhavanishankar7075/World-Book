import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ViewHistory, ViewHistorySchema } from "./history.schema";
import { HistoryController } from "./history.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: ViewHistory.name, schema: ViewHistorySchema }])],
  controllers: [HistoryController],
})
export class HistoryModule {}
