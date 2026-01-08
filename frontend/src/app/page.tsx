"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import SkeletonGrid from "@/components/SkeletonGrid";

type Navigation = {
  _id: string;
  title: string;
  slug: string;
};

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery<Navigation[]>({
    queryKey: ["navigation"],
    queryFn: async () =>
      (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/navigation`)).data,
  });

  if (isLoading) return <SkeletonGrid />;

  if (isError || !data || data.length === 0) {
    return (
      <div className="p-10 text-center space-y-4">
        <p className="text-red-500 text-lg">
          No navigation data available yet.
        </p>
        <p className="text-gray-500 text-sm">
          Please trigger scraping from backend first.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Browse Book Collections
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {data.map((nav) => (
          <Link
            key={nav._id}
            href={`/category/${nav.slug}`}
            className="border p-4 rounded-xl bg-white hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-black"
          >
            <span className="font-medium text-gray-700">{nav.title}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
