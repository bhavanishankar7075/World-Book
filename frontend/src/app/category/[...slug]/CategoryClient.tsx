"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: string;
  image_url: string;
  slug: string;
};

// Skeleton Loading Component
function SkeletonGrid() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Functional States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(false);

    // Scroll to top when page or sort changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || (
      typeof window !== 'undefined' && window.location.origin.includes('localhost')
        ? 'http://localhost:3001'
        : 'https://your-backend-url.com'
    );

    // Dynamic URL matching the fixed Backend Controller
    const url = `${baseUrl}/category?slug=${encodeURIComponent(slug)}&page=${page}&sortBy=${sortBy}&order=${order}&limit=20`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setProducts(data.products || []);
        setTotalPages(data.pages || 1); // Set total pages from backend
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug, page, sortBy, order]);

  const handleSort = (newSort: string, newOrder: string) => {
    setSortBy(newSort);
    setOrder(newOrder);
    setPage(1); 
    setIsSortOpen(false);
  };

  if (loading) return <SkeletonGrid />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Category</h2>
          <p className="text-gray-600 mb-6">We couldn't load the products for this category.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const categoryTitle = slug.split('/').pop()?.replaceAll('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Products';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
            </li>
            {slug.split('/').map((segment, i, arr) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                <span className={i === arr.length - 1 ? "text-gray-900 font-medium" : "text-blue-600 hover:text-blue-700"}>
                  {segment.replaceAll('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Header with Filter & Sort Options */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white relative overflow-visible">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryTitle}</h1>
              <p className="text-blue-100 text-lg">
                Page {page} of {totalPages}
              </p>
            </div>
            <div className="flex items-center gap-3 relative">
              <button className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Sort By
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-[100] border border-gray-100 overflow-hidden text-gray-800">
                    <button onClick={() => handleSort("createdAt", "desc")} className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm transition-colors">Newest Arrivals</button>
                    <button onClick={() => handleSort("price", "asc")} className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm transition-colors border-t border-gray-50">Price: Low to High</button>
                    <button onClick={() => handleSort("price", "desc")} className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm transition-colors border-t border-gray-50">Price: High to Low</button>
                    <button onClick={() => handleSort("title", "asc")} className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm transition-colors border-t border-gray-50">Name (A-Z)</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map(p => (
              <Link
                key={p._id}
                href={`/product/${p.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="aspect-square p-4 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 min-h-[2.5rem]">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-lg">{p.price}</span>
                    <div className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">No products found for this selection.</div>
          )}
        </div>

        {/* Pagination Logic */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {/* Dynamic Page Buttons */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Only show a few page numbers if there are many pages
                if (totalPages > 5 && Math.abs(pageNum - page) > 2) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${page === pageNum ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}