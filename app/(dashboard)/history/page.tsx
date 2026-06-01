"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, VideoIcon, Download, Trash2, Search, Filter } from "lucide-react";
import { useState } from "react";

const mockHistory = [
  {
    id: "1",
    type: "image",
    name: "无线降噪耳机 - 5张场景图",
    thumbnail: "https://picsum.photos/seed/h1/200/200",
    count: 5,
    createdAt: "2 分钟前",
    cost: "$0.15",
  },
  {
    id: "2",
    type: "video",
    name: "夏季连衣裙 - UGC 视频 3 条",
    thumbnail: "https://picsum.photos/seed/h2/200/200",
    count: 3,
    createdAt: "1 小时前",
    cost: "$0.60",
  },
  {
    id: "3",
    type: "image",
    name: "蓝牙音箱 - 12 张批量素材",
    thumbnail: "https://picsum.photos/seed/h3/200/200",
    count: 12,
    createdAt: "3 小时前",
    cost: "$0.36",
  },
  {
    id: "4",
    type: "video",
    name: "运动鞋 - 多语言数字人口播 6 条",
    thumbnail: "https://picsum.photos/seed/h4/200/200",
    count: 6,
    createdAt: "昨天",
    cost: "$1.20",
  },
  {
    id: "5",
    type: "image",
    name: "智能手表 - 白底图 8 张",
    thumbnail: "https://picsum.photos/seed/h5/200/200",
    count: 8,
    createdAt: "昨天",
    cost: "$0.24",
  },
  {
    id: "6",
    type: "video",
    name: "美妆蛋 - 痛点解决视频 4 条",
    thumbnail: "https://picsum.photos/seed/h6/200/200",
    count: 4,
    createdAt: "2 天前",
    cost: "$0.80",
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [search, setSearch] = useState("");

  const filtered = mockHistory.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Topbar title="历史记录" subtitle="所有生成过的图片和视频" />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 px-3 h-10 rounded-lg bg-white border border-slate-200">
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
              { id: "all", label: "全部" },
              { id: "image", label: "图片" },
              { id: "video", label: "视频" },
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "总项目", value: "47" },
            { label: "总图片", value: "186" },
            { label: "总视频", value: "62" },
            { label: "总成本", value: "$24.18" },
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
            <Card key={item.id} className="overflow-hidden hover-lift cursor-pointer group">
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                <div className="font-semibold text-slate-900 text-sm line-clamp-1">{item.name}</div>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                  <span>{item.createdAt}</span>
                  <span className="font-mono">{item.cost}</span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                    <Download className="w-3 h-3" />
                    下载
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-red-600 hover:bg-red-50">
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
      </div>
    </>
  );
}
