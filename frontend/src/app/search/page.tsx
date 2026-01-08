"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  author: string;
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
          <div className="h-10 bg-gray-200 rounded w-96 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("fiction");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("latest");
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    const apiUrl = typeof window !== 'undefined'
      ? window.location.origin.includes('localhost')
        ? 'http://localhost:3001'
        : 'https://your-backend-url.com'
      : '';

    fetch(
      `${apiUrl}/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=16&sort=${sort}`
    )
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setTotalPages(data.pages || 1);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [query, page, sort]);

  if (!query) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Search for Books</h2>
          <p className="text-gray-600 mb-6">Start typing in the search box above to discover amazing books</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Try searching for:</span>
            <button onClick={() => setQuery("fiction")} className="text-blue-600 font-semibold hover:underline">Fiction</button>
            <span>•</span>
            <button onClick={() => setQuery("mystery")} className="text-blue-600 font-semibold hover:underline">Mystery</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <SkeletonGrid />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Search Results
              </h1>
              <p className="text-blue-100 text-sm md:text-base">
                Found {products.length} results for <span className="font-bold text-white">"{query}"</span>
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium hidden md:block">Sort by:</label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="appearance-none bg-white text-gray-900 border-2 border-white rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all cursor-pointer"
                >
                  <option value="latest">Latest First</option>
                  <option value="price_low">Price: Low → High</option>
                  <option value="price_high">Price: High → Low</option>
                  <option value="az">Title: A → Z</option>
                  <option value="za">Title: Z → A</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* No Results */}
        {products.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find any books matching your search</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500">Try searching for:</span>
              <button onClick={() => setQuery("fiction")} className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold hover:bg-blue-200">Fiction</button>
              <button onClick={() => setQuery("science")} className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-semibold hover:bg-purple-200">Science</button>
              <button onClick={() => setQuery("history")} className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold hover:bg-green-200">History</button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map(p => (
                <a
                  key={p._id}
                  href={`/product/${p.slug}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  <div className="aspect-square p-4 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1 min-h-[2.5rem]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 truncate">{p.author || "Unknown Author"}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-lg">{p.price}</span>
                      <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing page <span className="font-bold text-gray-900">{page}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <div className="hidden sm:flex gap-2">
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${page === pageNum
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Search Suggestions */}
        {products.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Fiction', 'Mystery', 'Romance', 'Science', 'History', 'Biography', 'Fantasy', 'Thriller'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term.toLowerCase());
                    setPage(1);
                  }}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}