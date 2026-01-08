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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(p => (
        <a
          key={p._id}
          href={`/product/${p.slug}`}
          className="border p-3 rounded hover:shadow"
        >
          <img src={p.image_url} className="h-40 mx-auto object-contain" />
          <p className="mt-2 font-semibold text-sm">{p.title}</p>
          <p className="text-xs text-gray-500">{p.author || "Unknown Author"}</p>
          <p className="text-green-600">
            {p.currency} {p.price}
          </p>
        </a>
      ))}
    </div>
  );
}
