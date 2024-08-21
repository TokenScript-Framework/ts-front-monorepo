
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/shadcn/ui/toaster";
import { ThemeProviders } from "@/components/theme-providers";
import type { Metadata } from "next";
import "./globals.css";
import { RedirectInTg } from '@/components/redirect-in-tg';

export const metadata: Metadata = {
    title: "Smart Token Explorer",
    description: "Token Explorer",
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
                        <RedirectInTg />

                        {children}

                        <Toaster />
                    </Providers>
                </ThemeProviders>
            </body>
        </html>
    );
}
