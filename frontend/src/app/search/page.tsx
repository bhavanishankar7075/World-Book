"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonGrid from "@/components/SkeletonGrid";

type Product = {
  _id: string;
  title: string;
  author: string;
  price: string;
  image_url: string;
  slug: string;
};

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();

  const q = params.get("q") || "";
  const page = Number(params.get("page") || "1");
  const sort = params.get("sort") || "latest";

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${encodeURIComponent(q)}&page=${page}&limit=16&sort=${sort}`
    )
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setTotalPages(data.pages || 1);
        setLoading(false);
      });
  }, [q, page, sort]);

  const changePage = (p: number) => {
    router.push(`/search?q=${encodeURIComponent(q)}&page=${p}&sort=${sort}`);
  };

  const changeSort = (value: string) => {
    router.push(`/search?q=${encodeURIComponent(q)}&page=1&sort=${value}`);
  };

  if (!q)
    return <p className="p-8 text-center text-gray-500">Start typing in the search box above.</p>;

  if (loading) return <SkeletonGrid />;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-3">
        <h1 className="text-lg font-semibold">
          Search results for "<span className="text-blue-600">{q}</span>"
        </h1>

        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) => changeSort(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="latest">Latest</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="az">Title: A → Z</option>
          <option value="za">Title: Z → A</option>
        </select>
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      )}

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <Link
            key={p._id}
            href={`/product/${p.slug}`}
            className="border rounded-xl p-3 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="h-40 flex justify-center items-center">
              <img src={p.image_url} alt={p.title} className="max-h-full object-contain" />
            </div>
            <p className="mt-2 font-semibold text-sm line-clamp-2">{p.title}</p>
            <p className="text-xs text-gray-500">{p.author || "Unknown Author"}</p>
            <p className="text-green-600 font-bold">{p.price}</p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-10 items-center">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm">
          Page <b>{page}</b> of <b>{totalPages}</b>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
