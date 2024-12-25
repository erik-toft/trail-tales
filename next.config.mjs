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
  output: "export", // Lägg till denna rad för att stödja statisk export
};

export default nextConfig;
