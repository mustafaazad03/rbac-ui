import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";


export const metadata: Metadata = {
  title: "Role Based Access Control",
  description: "Role Based Access Control with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased h-[100vh] overflow-hidden`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
