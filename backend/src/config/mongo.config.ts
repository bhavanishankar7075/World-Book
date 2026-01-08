import { MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

export const mongoConfig = {
  useFactory: async (config: ConfigService): Promise<MongooseModuleOptions> => ({
    uri: config.get<string>("MONGO_URI"),
  }),
  inject: [ConfigService],
};
