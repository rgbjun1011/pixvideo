"use client";

import Link from "next/link";
import { Bell, HelpCircle, Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Topbar({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-6">
      <div>
        {title && <h1 className="text-lg font-semibold text-slate-900">{title}</h1>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => toast.info("搜索功能即将上线")}
          className="hidden md:flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-100 text-sm text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors w-64"
        >
          <Search className="w-4 h-4" />
          <span>搜索项目、模板...</span>
          <span className="ml-auto text-xs text-slate-400 font-mono flex items-center gap-1">
            <Command className="w-3 h-3" />K
          </span>
        </button>
        <button
          onClick={() => toast.info("帮助中心：查看使用文档", {
            description: "Demo 暂未接入完整文档站",
          })}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="帮助"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        <button
          onClick={() => toast.info("暂无新通知", {
            description: "新功能发布时会在这里通知你",
          })}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 relative transition-colors"
          aria-label="通知"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <Link href="/images">
          <Button size="sm" className="ml-2">
            新建项目
          </Button>
        </Link>
      </div>
    </header>
  );
}
