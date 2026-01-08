export default function ProductSkeleton() {
  return (
    <div className="border p-4 rounded-xl animate-pulse">
      <div className="h-44 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
