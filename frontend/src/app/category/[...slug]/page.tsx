import CategoryClient from "./CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;

  const slugPath = resolvedParams.slug
    .map(decodeURIComponent)
    .join("/");

  return <CategoryClient slug={slugPath} />;
}
