import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  return {
    title: searchParams.q
      ? `Search results for "${searchParams.q}"`
      : "Search Books – WorldBook",
    description: "Search books by title, author or ISBN on WorldBook.",
  };
}
