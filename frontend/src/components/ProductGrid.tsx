type Product = {
  _id: string;
  title: string;
  image_url: string;
  price: string;
  currency: string;
  author: string;
  slug: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map(p => (
        <a
          key={p._id}
          href={`/product/${p.slug}`}
          className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
        >
          {/* Image Container */}
          <div className="aspect-square p-4 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
            <img
              src={p.image_url}
              alt={p.title}
              className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
            />

            {/* Wishlist Icon - Appears on Hover */}
            <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>

            {/* Quick View Badge */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              Quick View
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 border-t border-gray-100">
            <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1 min-h-[2.5rem]">
              {p.title}
            </h3>

            {/* Author */}
            <p className="text-xs text-gray-500 mb-3 truncate flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {p.author || "Unknown Author"}
            </p>

            {/* Price and Cart */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 line-through">
                  {p.currency} {(parseFloat(p.price) * 1.3).toFixed(2)}
                </p>
                <p className="text-green-600 font-bold text-lg">
                  {p.currency} {p.price}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100 shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.0)</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}