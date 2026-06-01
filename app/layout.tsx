import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PixVideo — AI素材工厂 | 外贸电商图片+视频一站式",
  description:
    "3分钟从商品链接到全套素材：白底图+场景图+模特图+10条带货视频。专为跨境电商卖家设计。",
  keywords: ["AI商品图", "AI视频", "跨境电商", "TikTok带货", "Amazon主图", "SaaS"],
  authors: [{ name: "PixVideo" }],
  openGraph: {
    title: "PixVideo — 外贸电商的AI素材工厂",
    description: "3分钟从URL到全套素材。月省$2000拍摄费。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-white text-ink-900">
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
