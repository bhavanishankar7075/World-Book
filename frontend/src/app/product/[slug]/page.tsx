"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Review = {
  author: string;
  rating: number;
  text: string;
};

type RelatedProduct = {
  title: string;
  slug: string;
  image_url?: string;
  price?: string;
};

type Product = {
  title: string;
  price: string;
  image_url: string;
  description: string;
  ratings_avg: number;
  reviews_count: number;
  specs: {
    publisher?: string;
    isbn?: string;
    publish_date?: string;
  };
  reviews: Review[];
  related?: RelatedProduct[];
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError(true));
  }, [slug]);

  if (error)
    return <p className="p-6 text-center text-red-500">Product not found.</p>;

  if (!product)
    return (
      <div className="p-8 max-w-4xl mx-auto animate-pulse">
        <div className="h-80 bg-gray-200 rounded-lg"></div>
        <div className="mt-6 h-8 w-3/4 bg-gray-200 rounded"></div>
        <div className="mt-3 h-6 w-1/4 bg-gray-200 rounded"></div>
      </div>
    );

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <img src={product.image_url} alt={product.title} className="h-80 mx-auto object-contain" />

      <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
      <p className="text-green-600 text-xl mt-2">{product.price}</p>

      <p className="mt-2 text-sm text-gray-600">
        ⭐ {product.ratings_avg} / 5 ({product.reviews_count} reviews)
      </p>

      <section className="mt-4 text-sm space-y-1">
        <p><b>Publisher:</b> {product.specs?.publisher || "N/A"}</p>
        <p><b>ISBN:</b> {product.specs?.isbn || "N/A"}</p>
        <p><b>Published:</b> {product.specs?.publish_date || "N/A"}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold text-lg">Description</h2>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-semibold text-lg mb-3">Customer Reviews</h2>

        {product.reviews.length === 0 && (
          <p className="text-gray-500 text-sm">No reviews available.</p>
        )}

        {product.reviews.map((r, i) => (
          <div key={i} className="border-b py-3 text-sm">
            <p className="font-semibold">{r.author}</p>
            <p className="text-yellow-600">⭐ {r.rating} / 5</p>
            <p className="text-gray-700 mt-1">{r.text}</p>
          </div>
        ))}
      </section>


      {product.related && product.related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-semibold text-lg mb-4">Related Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.related.map(r => (
              <Link
                key={r.slug}
                href={`/product/${r.slug}`}
                className="border rounded-lg p-3 hover:shadow-md bg-white"
              >
                <div className="h-32 flex justify-center items-center">
                  <img
                    src={r.image_url || "/placeholder.png"}
                    alt={r.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold line-clamp-2">{r.title}</p>
                <p className="text-green-600 font-bold text-sm mt-1">
                  {r.price || "Price unavailable"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
