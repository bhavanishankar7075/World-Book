import { Controller, Get, Param, Query, NotFoundException } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("search")
  async search(
    @Query("q") q = "",
    @Query("page") page = "1",
    @Query("limit") limit = "20"
  ) {
    return this.productService.searchProducts(q, Number(page), Number(limit));
  }

  @Get(":slug")
  async getBySlug(@Param("slug") slug: string) {
    const product = await this.productService.getProductBySlug(slug);

    if (!product) {
      throw new NotFoundException(`Product "${slug}" not found`);
    }

    return product;
  }
}
