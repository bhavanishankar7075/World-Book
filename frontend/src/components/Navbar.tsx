"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  const submitSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const linkClass = (p: string) =>
    `px-3 py-1 rounded-md text-sm font-medium transition ${
      pathname === p
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-wide">
          WorldBook
        </Link>

        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsTyping(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            placeholder="Search books, authors, ISBN..."
            className="w-full border rounded-full px-5 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isTyping && query && (
            <button
              onClick={submitSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              🔍
            </button>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 text-sm">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
