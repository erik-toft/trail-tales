import path from "path";

// Hämta basvägen för att hantera alias
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Lägg till alias för @
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // Mappas till ./src/
    };
    return config;
  },
  output: "export", // Lägg till detta för att möjliggöra statisk export
  distDir: "out", // Mappen för de statiska filerna
  trailingSlash: true, // För att säkerställa att URL:erna slutar med '/'
};

export default nextConfig;
