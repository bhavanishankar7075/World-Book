export default function ProductDetailSkeleton() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-pulse">
      <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}
