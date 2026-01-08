import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "WorldBook – Discover Millions of Books Online",
  description:
    "Explore books by category, author and ISBN. Read reviews, ratings and find best deals on WorldBook.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
