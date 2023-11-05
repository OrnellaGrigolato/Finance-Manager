//next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['default', 'en', 'es'],
  //   defaultLocale: 'default',
  //   localeDetection: false,
  // },
  // trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
      },
    ],
  },
 };
 
 module.exports = nextConfig;
 