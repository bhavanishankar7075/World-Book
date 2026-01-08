"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading analytics...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Admin Analytics</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">📦 Products: {data.totalProducts}</div>
        <div className="p-4 border rounded">📁 Categories: {data.totalCategories}</div>
        <div className="p-4 border rounded">📊 Avg / Category: {data.avgProductsPerCategory}</div>
        <div className="p-4 border rounded">⏰ Last Scrape: {String(data.lastScrapeTime)}</div>
      </div>
    </div>
  );
}
