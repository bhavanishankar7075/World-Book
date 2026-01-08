import { Controller, Post } from "@nestjs/common";
import { ScrapeService } from "./scrape.service";

@Controller("scrape")
export class ScrapeController {
  constructor(private readonly service: ScrapeService) { }

  @Post("full")
  startFullScrape() {
    this.service.runFullScrapePipeline()
      .then(() => console.log(" Full scrape finished"))
      .catch(err => console.error(" Full scrape failed", err));

    return { success: true, message: "Full scrape started" };
  }

  @Post("missing-details")
  scrapeMissingDetails() {
    return this.service.scrapeMissingProductDetails();
  }

  @Post("recalc-counts")
  recalcCounts() {
    return this.service.recalcCategoryCounts();
  }
}
