import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Tailwind second (will override Bootstrap)

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Inter supports all weights
});

export const metadata: Metadata = {
  title: "Certify",
  description:
    "Certify is a web application designed to streamline the certification request process in the registrar's office.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id?: string;
  employee_id: string;
  lastname: string;
  password_hash: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Debug function to create default user
export async function createDefaultUser() {
  const bcrypt = require("bcryptjs");

  try {
    console.log("🔍 Checking database connection...");

    // Test connection
    const { data: testData, error: testError } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    if (testError) {
      console.error("❌ Database connection failed:", testError);
      return false;
    }

    console.log("✅ Database connection successful!");

    // Check if default user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("employee_id", "12345")
      .single();

    if (existingUser) {
      console.log("ℹ️ Default user already exists:", existingUser);
      return true;
    }

    // Create default user
    const defaultPassword = await bcrypt.hash("password123", 10);

    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({
        employee_id: "12345",
        lastname: "TestUser",
        password_hash: defaultPassword,
        is_active: true,
      })
      .select()
      .single();

    if (createError) {
      console.error("❌ Failed to create default user:", createError);
      return false;
    }

    console.log("🎉 Default user created successfully:", newUser);
    return true;
  } catch (error) {
    console.error("❌ Error in createDefaultUser:", error);
    return false;
  }
}

// Authentication functions
export async function activateAccount(
  employeeId: string,
  lastname: string,
  password: string
) {
  const bcrypt = require("bcryptjs");

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("employee_id", employeeId)
      .single();

    if (existingUser) {
      throw new Error("Account with this Employee ID already exists");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        employee_id: employeeId,
        lastname: lastname,
        password_hash: passwordHash,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("Activation error:", error);
    return { success: false, error: error.message };
  }
}

export async function loginUser(employeeId: string, password: string) {
  const bcrypt = require("bcryptjs");

  try {
    // Find user
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("employee_id", employeeId)
      .eq("is_active", true)
      .single();

    if (error || !user) {
      throw new Error("Invalid credentials or account not activated");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return { success: true, user };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}
