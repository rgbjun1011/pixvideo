"use client";

import Link from "next/link";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-6">
      <div>
        {title && <h1 className="text-lg font-semibold text-slate-900">{title}</h1>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-100 text-sm text-slate-500 w-64">
          <Search className="w-4 h-4" />
          <span>搜索...</span>
          <span className="ml-auto text-xs text-slate-400 font-mono">⌘K</span>
        </div>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 relative">
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
