export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return { title: "Product not found" };

  const product = await res.json();

  return {
    title: `${product.title} – Buy Online`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      images: [product.image_url],
    },
  };
}
