"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-glow flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-lg w-full text-center"
      >
        <div className="mb-6 inline-flex">
          <div className="relative">
            <div className="text-[140px] font-black leading-none text-gradient">
              404
            </div>
            <div className="absolute -top-2 -right-4 text-3xl animate-bounce">🔍</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          页面去拍视频了
        </h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          你访问的页面不存在。可能链接已失效，或者地址输错了。
          回到首页继续你的 AI 素材创作吧。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/">
            <Button>
              <Home className="w-4 h-4" />
              回首页
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              回到工作台
            </Button>
          </Link>
        </div>

        <div className="text-sm text-slate-500 mb-4">或者试试这些：</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "AI 商品图", href: "/images", gradient: "from-blue-500 to-cyan-500" },
            { label: "AI 视频", href: "/videos", gradient: "from-purple-500 to-pink-500" },
            { label: "套餐", href: "/billing", gradient: "from-amber-500 to-orange-500" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover-lift cursor-pointer group">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm font-semibold text-slate-900">{item.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
