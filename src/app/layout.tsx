import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "This is a financial management app",
};
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const avenirNext = localFont({
  src: [
    {
      path: "./AvenirNextLTPro-It.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AvenirNextLTPro-Bold.otf",
      weight: "600",
      style: "semibold",
    },

    {
      path: "./AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-avenir",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${avenirNext.variable} ${inter.className}`}>
        <div className="font-avenir">{children}</div>
      </body>
    </html>
  );
}