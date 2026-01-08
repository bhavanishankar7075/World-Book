"use client";
import { useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function HistoryTracker() {
  const path = usePathname();

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/history`, { path });
  }, [path]);

  return null;
}
