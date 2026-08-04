import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // İlerleme sayfası Profil'e taşındı; eski yer imleri ve PWA kısayolları kırılmasın.
      { source: "/progress", destination: "/profile", permanent: false },
    ];
  },
};

export default nextConfig;
