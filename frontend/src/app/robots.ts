export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://world-book-backend.onrender.com/sitemap.xml",
  };
}
