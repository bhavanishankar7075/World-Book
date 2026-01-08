export default async function sitemap() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/navigation`);
  const navs = await res.json();

  return navs.map((n: any) => ({
    url: `https://world-book-backend.onrender.com/category/${n.slug}`,
    lastModified: new Date(),
  }));
}
