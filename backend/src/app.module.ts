import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";

import { mongoConfig } from "./config/mongo.config";
import { NavigationModule } from "./navigation/navigation.module";
import { ScrapeModule } from "./scrape/scrape.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { HistoryModule } from "./history/history.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(mongoConfig),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: "default",
          ttl: 60,
          limit: 20,
        },
      ],
    }),

    NavigationModule,
    ScrapeModule,
    CategoryModule,
    ProductModule,
    HistoryModule,
  ],
})
export class AppModule {}
