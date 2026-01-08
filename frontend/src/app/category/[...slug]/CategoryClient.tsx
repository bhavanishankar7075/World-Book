"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonGrid from "@/components/SkeletonGrid";

type Product = {
  _id: string;
  title: string;
  price: string;
  image_url: string;
  slug: string;
};

export default function CategoryClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(false);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category?slug=${encodeURIComponent(slug)}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <SkeletonGrid />;
  if (error) return <p className="p-6 text-center text-red-500">Failed to load category.</p>;
  if (!products.length) return <p className="p-6 text-center">No products found.</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link> / {slug.replaceAll("/", " / ")}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <Link
            key={p._id}
            href={`/product/${p.slug}`}
            className="border rounded-xl p-3 hover:shadow bg-white"
          >
            <div className="h-40 flex justify-center items-center">
              <img src={p.image_url} className="max-h-full object-contain" />
            </div>
            <p className="mt-2 font-semibold text-sm">{p.title}</p>
            <p className="text-green-600 font-bold">{p.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
