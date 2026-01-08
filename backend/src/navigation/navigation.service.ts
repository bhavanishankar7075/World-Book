import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Navigation } from "./navigation.schema";

@Injectable()
export class NavigationService {
  constructor(@InjectModel(Navigation.name) private model: Model<Navigation>) { }

  async findAll() {
    return this.model.find();
  }

  async upsertMany(items: any[]) {
    for (const item of items) {
      await this.model.updateOne(
        { slug: item.slug },
        { ...item, last_scraped_at: new Date() },
        { upsert: true }
      );
    }
  }
}
