import { Controller, Post } from "@nestjs/common";
import { ScrapeService } from "./scrape.service";

@Controller("scrape")
export class ScrapeController {
  constructor(private readonly service: ScrapeService) {}

  @Post("full")
  startFullScrape() {
    // 🔥 Run pipeline in background – do NOT await
    this.service.runFullScrapePipeline()
      .then(() => console.log("🎉 Scrape job finished"))
      .catch(err => console.error("❌ Scrape job failed", err));

    return {
      success: true,
      message: "Scraping started in background. Check backend logs."
    };
  }
}
