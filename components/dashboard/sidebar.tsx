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
import { useAppStore } from "@/lib/store";
import { getAvatarUrl } from "@/lib/avatars";

const navItems = [
  { href: "/dashboard", label: "工作台", icon: Sparkles },
  { href: "/images", label: "AI 商品图", icon: ImageIcon },
  { href: "/videos", label: "AI 视频", icon: VideoIcon },
  { href: "/history", label: "历史记录", icon: History },
  { href: "/billing", label: "套餐", icon: CreditCard },
];

const PLAN_LIMITS = {
  free: 20,
  starter: 100,
  pro: 500,
  enterprise: 2000,
};

function UsageCard() {
  const usageImages = useAppStore((s) => s.usageThisMonth.images);
  const plan = useAppStore((s) => s.user?.plan || "pro");
  const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || 500;
  const pct = Math.min((usageImages / limit) * 100, 100);

  return (
    <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
      <div className="text-xs font-semibold text-blue-700 mb-1">本月使用</div>
      <div className="text-lg font-bold text-slate-900">
        {usageImages} / {limit}
      </div>
      <div className="text-xs text-slate-500 mb-2">张图</div>
      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Link href="/billing">
        <button className="mt-3 w-full text-xs font-semibold text-blue-600 hover:text-blue-700">
          {usageImages >= limit ? "已达上限，升级 →" : "升级套餐 →"}
        </button>
      </Link>
    </div>
  );
}

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
      <UsageCard />

      {/* User Menu */}
      <div className="p-3 border-t border-slate-200 relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <img
            src={getAvatarUrl("lisa", "female")}
            alt="Lisa"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">Lisa Wang</div>
            <div className="text-xs text-slate-500">Pro 套餐</div>
          </div>
          <ChevronUp
            className={cn(
              "w-4 h-4 text-slate-400 transition-transform shrink-0",
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
              className="absolute bottom-full left-3 right-3 mb-2 bg-white border border-slate-200 rounded-xl shadow-elevated overflow-hidden z-20"
            >
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                设置
              </Link>
              <Link
                href="/billing"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 border-t border-slate-100"
                onClick={() => setUserMenuOpen(false)}
              >
                <CreditCard className="w-4 h-4" />
                套餐与账单
              </Link>
              <button
                onClick={() => {
                  alert("这是 demo，登录功能未实现");
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100"
              >
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
