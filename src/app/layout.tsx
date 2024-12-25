import type { Metadata } from "next";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/contexts/AuthContextProvider";
import Nav from "@/components/Nav";

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
      <body>
        <Nav />
        <AuthContextProvider>{children}</AuthContextProvider>
        <Footer />
      </body>
    </html>
  );
}
