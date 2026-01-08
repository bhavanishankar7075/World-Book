import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function SkeletonCard({ children }: Props) {
  return (
    <div className="animate-pulse border rounded-xl p-3 bg-gray-100">
      {children ? (
        children
      ) : (
        <>
          <div className="h-40 bg-gray-300 rounded mb-3" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </>
      )}
    </div>
  );
}
