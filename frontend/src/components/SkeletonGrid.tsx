import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
