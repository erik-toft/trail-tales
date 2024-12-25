import path from "path";

const nextConfig = {
  experimental: {
    appDir: true, // Aktiverar appDir för att använda /app för sidor istället för /pages
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve("src"); // Sätter upp alias för @ till src-mappen
    return config;
  },
};

export default nextConfig;
