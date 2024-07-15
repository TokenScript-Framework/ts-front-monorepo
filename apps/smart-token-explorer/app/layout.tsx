import Footer from "@/components/footer";
import Header from "@/components/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/shadcn/ui/toaster";
import { ThemeProviders } from "@/components/theme-providers";
import { colors, colorsRgb } from "@/data/config/colors";
import type { Metadata } from "next";
import "./globals.css";

const globalColors = colors;
const style: string[] = [];

Object.keys(globalColors).map((variant) => {
  return Object.keys(globalColors[variant]).map((color) => {
    const value = colors[variant][color];
    const rgbValue = colorsRgb[variant][color];
    style.push(`--${variant}-${color}-hex: ${value}`);
    style.push(`--${variant}-${color}: ${rgbValue}`);
  });
});

export const metadata: Metadata = {
  title: "Smart Token Explorer",
  description: "Token explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Providers>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </Providers>
        </ThemeProviders>
      </body>
    </html>
  );
}
