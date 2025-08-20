"use client";
import { useEffect } from "react";
import { createDefaultUser } from "@/lib/supabase";

export default function DatabaseInitializer() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Initializing database connection...");
      createDefaultUser();
    }
  }, []);

  // This component doesn't render anything
  return null;
}
