import localFont from "next/font/local";

export const ppNeueMontreal = localFont({
  src: [
    {
      path: "./fonts/ppneuemontreal-thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/ppneuemontreal-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-semibolditalic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/ppneuemontreal-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});
