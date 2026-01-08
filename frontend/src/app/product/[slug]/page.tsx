"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Re-added for fast navigation
import { useParams } from "next/navigation"; // Re-added to get the actual slug

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

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== 'undefined' && window.location.origin.includes('localhost')
        ? 'http://localhost:3001'
        : 'https://your-backend-url.com');

    fetch(`${apiUrl}/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-96 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/categories" className="text-blue-600 hover:text-blue-700 font-medium">Books</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate max-w-xs">{product.title}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100">
              <img
                src={product.image_url}
                alt={product.title}
                className="max-h-96 w-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                {renderStars(Math.round(product.ratings_avg))}
                <span className="text-sm text-gray-600 font-medium">
                  {product.ratings_avg.toFixed(1)} ({product.reviews_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl">
                  <span className="text-3xl font-bold">{product.price}</span>
                </div>
              </div>

              {/* Specs */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Product Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Publisher:</span>
                    <span className="text-gray-900 font-semibold">{product.specs?.publisher || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">ISBN:</span>
                    <span className="text-gray-900 font-semibold">{product.specs?.isbn || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Published:</span>
                    <span className="text-gray-900 font-semibold">{product.specs?.publish_date || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button className="bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Customer Reviews ({product.reviews_count})
          </h2>

          {product.reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No reviews yet</p>
              <p className="text-sm text-gray-400 mt-2">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {product.reviews.map((r, i) => (
                <div key={i} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{r.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(r.rating)}
                        <span className="text-sm text-gray-600 font-medium">{r.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {product.related && product.related.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {product.related.map(r => (
                <Link
                  key={r.slug}
                  href={`/product/${r.slug}`}
                  className="group bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-lg mb-3 p-4">
                    <img
                      src={r.image_url || "/placeholder.png"}
                      alt={r.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
                    {r.title}
                  </h3>
                  <p className="text-green-600 font-bold text-lg mt-2">
                    {r.price || "Price unavailable"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}