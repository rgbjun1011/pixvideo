"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, VideoIcon, Download, Trash2, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useAppStore, formatRelativeTime } from "@/lib/store";
import { toast } from "sonner";
import { downloadImage } from "@/lib/utils";
import Link from "next/link";

export default function HistoryPage() {
  const assets = useAppStore((s) => s.assets);
  const removeAsset = useAppStore((s) => s.removeAsset);
  const clearAssets = useAppStore((s) => s.clearAssets);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return assets.filter((item) => {
      if (filter !== "all" && item.type !== filter) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [assets, filter, search]);

  const totalImages = assets.filter((a) => a.type === "image").reduce((s, a) => s + a.count, 0);
  const totalVideos = assets.filter((a) => a.type === "video").reduce((s, a) => s + a.count, 0);
  const totalCost = assets.reduce((s, a) => s + a.cost, 0);

  return (
    <>
      <Topbar title="历史记录" subtitle="所有生成过的图片和视频" />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Empty state */}
        {assets.length === 0 ? (
          <Card className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">还没有生成过任何素材</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6 max-w-md mx-auto">
              去 AI 商品图 或 AI 视频引擎生成第一张图/视频，结果会自动出现在这里
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/images">
                <Button>
                  <ImageIcon className="w-4 h-4" />
                  生成图片
                </Button>
              </Link>
              <Link href="/videos">
                <Button variant="outline">
                  <VideoIcon className="w-4 h-4" />
                  生成视频
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 px-3 h-10 rounded-lg bg-white border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索项目名..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-1.5 p-1 rounded-lg bg-slate-100">
                {[
                  { id: "all", label: `全部 ${assets.length}` },
                  { id: "image", label: `图片 ${totalImages}` },
                  { id: "video", label: `视频 ${totalVideos}` },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id as any)}
                    className={`px-4 h-8 rounded-md text-sm font-medium transition-all ${
                      filter === f.id
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              {assets.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("确定清空所有历史记录？此操作不可恢复")) {
                      clearAssets();
                      toast.success("已清空历史");
                    }
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  清空
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "总项目", value: assets.length },
                { label: "总图片", value: totalImages },
                { label: "总视频", value: totalVideos },
                { label: "总成本", value: `$${totalCost.toFixed(2)}` },
              ].map((s) => (
                <Card key={s.label} className="p-4">
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </Card>
              ))}
            </div>

            {/* History list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover-lift cursor-pointer group"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      {item.type === "image" ? (
                        <Badge variant="primary" size="sm">
                          <ImageIcon className="w-3 h-3" />
                          {item.count} 张图
                        </Badge>
                      ) : (
                        <Badge variant="purple" size="sm">
                          <VideoIcon className="w-3 h-3" />
                          {item.count} 条视频
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-slate-900 text-sm line-clamp-1">
                      {item.name}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{formatRelativeTime(item.createdAt)}</span>
                      <span className="font-mono">${item.cost.toFixed(2)}</span>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-xs"
                        onClick={() => {
                          if (item.url) {
                            downloadImage(item.url, `${item.name}.png`);
                            toast.success("已下载");
                          }
                        }}
                      >
                        <Download className="w-3 h-3" />
                        下载
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (confirm(`删除「${item.name}」？`)) {
                            removeAsset(item.id);
                            toast.success("已删除");
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-slate-500">没找到匹配的项目</div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
