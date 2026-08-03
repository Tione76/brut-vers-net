import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["@/framework"],
  },
  // Évite les erreurs "Cannot find module './331.js'" sur Windows en dev
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/politique-de-cookies",
        destination: "/gestion-des-cookies",
        permanent: true,
      },
      {
        source: "/salaire-net-brut/:montant",
        destination: "/combien-gagner-brut-mensuel-pour-:montant-net",
        permanent: true,
      },
      {
        source: "/net-vers-brut/:montant",
        destination: "/combien-gagner-brut-mensuel-pour-:montant-net",
        permanent: true,
      },
      {
        source: "/combien-gagner-brut-pour-:montant-net",
        destination: "/combien-gagner-brut-mensuel-pour-:montant-net",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/combien-gagner-brut-mensuel-pour-:montant(\\d+)-net",
        destination: "/net-vers-brut/:montant",
      },
      {
        source: "/augmentation-salaire-mensuelle-:montant(\\d+)-euros-brut",
        destination: "/augmentation-salaire-mensuelle/:montant",
      },
      {
        source: "/quel-salaire-net-mensuel-pour-:montant(\\d+)-euros-brut",
        destination: "/salaire-brut-net/:montant",
      },
      {
        source: "/prime-brute-:montant(\\d+)-euros-en-net",
        destination: "/prime-brute-net/:montant",
      },
    ];
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Content-Security-Policy-Report-Only",
          value:
            "default-src 'self'; " +
            "base-uri 'self'; " +
            "object-src 'none'; " +
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.doubleclick.net https://*.google.com https://www.clarity.ms https://scripts.clarity.ms; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com data:; " +
            "img-src 'self' data: blob: https:; " +
            "connect-src 'self' https://api.resend.com https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.clarity.ms https://c.bing.com; " +
            "frame-src 'self' https:; " +
            "form-action 'self'; " +
            "worker-src 'self' blob:;",
        },
      ],
    },
    {
      source: "/(.*)\\.(svg|png|jpg|jpeg|webp|avif|ico)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

export default nextConfig;
