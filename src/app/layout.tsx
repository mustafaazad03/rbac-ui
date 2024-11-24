import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/navbar";


export const metadata: Metadata = {
  title: "Role Based Access Control",
  description: "Role Based Access Control with Next.js",
  icons: [
    {
      href: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
    {
      href: "/favicon.ico",
      rel: "apple-touch-icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased h-[100vh] overflow-hidden flex`}
      >
        <Sidebar />
        <div className="flex flex-col w-full h-full">
          <Nav/>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
