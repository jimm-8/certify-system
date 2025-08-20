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
