import Link from "next/link";

type Product = {
  slug: string;
  title: string;
  image_url: string;
  price: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border rounded-xl p-3 shadow-sm hover:shadow-md transition bg-white">
        <div className="h-48 flex justify-center items-center">
          <img src={product.image_url} className="max-h-full object-contain" />
        </div>

        <h3 className="mt-2 font-semibold text-sm text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-green-600 font-bold mt-1">{product.price}</p>
      </div>
    </Link>
  );
}
