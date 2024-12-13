import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/contexts/AuthContextProvider";
import Nav from "@/components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trail Tales",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Nav />
        <AuthContextProvider>{children}</AuthContextProvider>
        <Footer />
      </body>
    </html>
  );
}
