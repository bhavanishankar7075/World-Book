import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/navigation`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch navigation");

    const navs = await res.json();

    return navs.map((n: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${n.slug}`,
      lastModified: new Date(),
    }));
  } catch (err) {
    console.warn("⚠️ Sitemap generation skipped during build");

    // Prevent build failure
    return [];
  }
}
