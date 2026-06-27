import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pabasara Ilankoon | Electronic & Telecommunication Engineer",
  description:
    "Electronic and Telecommunication Engineering undergraduate at KDU. Passionate about Embedded AI, Computer Vision, IoT, and Wireless Communication.",
  keywords:
    "Pabasara Ilankoon, Electronic Engineering, Telecommunication, AI, Embedded Systems, Computer Vision, IoT, Sri Lanka, Portfolio",
  metadataBase: new URL("https://portfolio-kappa-lemon-55.vercel.app"),
  openGraph: {
    title: "Pabasara Ilankoon | Electronic & Telecom Engineer",
    description:
      "Embedded AI · Computer Vision · IoT — Engineering undergraduate at KDU Sri Lanka.",
    type: "website",
    locale: "en_US",
    siteName: "Pabasara Ilankoon Portfolio",
    url: "https://portfolio-kappa-lemon-55.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pabasara Ilankoon Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pabasara Ilankoon | Electronic & Telecom Engineer",
    description:
      "Embedded AI · Computer Vision · IoT — Engineering undergraduate at KDU Sri Lanka.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}