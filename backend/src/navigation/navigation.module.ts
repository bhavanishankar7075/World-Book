import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Navigation, NavigationSchema } from "./navigation.schema";
import { NavigationService } from "./navigation.service";
import { NavigationController } from "./navigation.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Navigation.name, schema: NavigationSchema }])
  ],
  providers: [NavigationService],
  controllers: [NavigationController],
})
export class NavigationModule { }
