import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { q?: string };
}): Promise<Metadata> {
  const q = searchParams?.q || "";

  return {
    title: q
      ? `Search results for "${q}"`
      : "Search Books – WorldBook",
    description: "Search books by title, author or ISBN on WorldBook.",
  };
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
