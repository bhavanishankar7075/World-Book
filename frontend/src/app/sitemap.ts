export default async function sitemap() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/navigation`);
  const navs = await res.json();

  return navs.map((n: any) => ({
    url: `https://your-domain.com/category/${n.slug}`,
    lastModified: new Date(),
  }));
}
