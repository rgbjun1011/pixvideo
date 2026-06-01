"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  History,
  CreditCard,
  Settings,
  Sparkles,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "工作台", icon: Sparkles },
  { href: "/images", label: "AI 商品图", icon: ImageIcon },
  { href: "/videos", label: "AI 视频", icon: VideoIcon },
  { href: "/history", label: "历史记录", icon: History },
  { href: "/billing", label: "套餐", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white sticky top-0 h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
            P
          </div>
          <span className="font-bold text-lg tracking-tight">PixVideo</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-blue-600" : "text-slate-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Usage Card */}
      <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
        <div className="text-xs font-semibold text-blue-700 mb-1">本月使用</div>
        <div className="text-lg font-bold text-slate-900">128 / 500</div>
        <div className="text-xs text-slate-500 mb-2">张图</div>
        <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "25.6%" }} />
        </div>
        <Link href="/billing">
          <button className="mt-3 w-full text-xs font-semibold text-blue-600 hover:text-blue-700">
            升级套餐 →
          </button>
        </Link>
      </div>

      {/* User Menu */}
      <div className="p-3 border-t border-slate-200 relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            L
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-slate-900">Lisa</div>
            <div className="text-xs text-slate-500">Pro 套餐</div>
          </div>
          <ChevronUp
            className={cn(
              "w-4 h-4 text-slate-400 transition-transform",
              !userMenuOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {userMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-3 right-3 mb-2 bg-white border border-slate-200 rounded-xl shadow-elevated overflow-hidden"
            >
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Settings className="w-4 h-4" />
                设置
              </Link>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100">
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
