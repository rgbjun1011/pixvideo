"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ImageIcon,
  VideoIcon,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Zap,
  Wand2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Topbar
        title="早上好，Lisa 👋"
        subtitle="今天又有一个新爆款在等你生成"
      />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/images">
              <Card className="p-6 hover-lift cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="primary">5 个模板</Badge>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  AI 商品图
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  上传产品图 → 3 秒出白底图、场景图、模特图
                </p>
                <Button size="sm">
                  立即开始
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link href="/videos">
              <Card className="p-6 hover-lift cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                    <VideoIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="purple">5 种爆款</Badge>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  AI 带货视频
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  贴 1 个爆款链接 → 10 条变体视频，1 小时搞定
                </p>
                <Button size="sm" variant="secondary">
                  立即开始
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: TrendingUp, label: "本月生成", value: "128", color: "text-blue-600" },
            { icon: Zap, label: "节省成本", value: "$2,400", color: "text-emerald-600" },
            { icon: Clock, label: "平均耗时", value: "3.2s", color: "text-purple-600" },
            { icon: Sparkles, label: "本月下载", value: "847", color: "text-amber-600" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            >
              <Card className="p-5">
                <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">最近项目</h2>
          <Link
            href="/history"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "无线降噪耳机", type: "image", count: 8, time: "2 分钟前", gradient: "from-blue-400 to-cyan-400" },
            { name: "夏季连衣裙", type: "video", count: 5, time: "1 小时前", gradient: "from-purple-400 to-pink-400" },
            { name: "蓝牙音箱", type: "image", count: 12, time: "3 小时前", gradient: "from-amber-400 to-orange-400" },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
            >
              <Card className="overflow-hidden hover-lift cursor-pointer">
                <div className={`h-32 bg-gradient-to-br ${p.gradient} relative`}>
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute bottom-2 right-2">
                    {p.type === "image" ? (
                      <Badge variant="gradient" className="bg-white/90 text-slate-700">
                        <ImageIcon className="w-3 h-3" /> {p.count} 张
                      </Badge>
                    ) : (
                      <Badge variant="gradient" className="bg-white/90 text-slate-700">
                        <VideoIcon className="w-3 h-3" /> {p.count} 条
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{p.time}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upgrade Banner */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-slate-900 text-white overflow-hidden relative">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 blur-2xl" />
          <div className="relative flex items-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">升级到 Enterprise</h3>
              <p className="text-sm text-slate-300 mt-0.5">
                解锁 500 条视频/月 + 无限品牌库 + API 接入
              </p>
            </div>
            <Button className="bg-white text-slate-900 hover:bg-slate-100">
              立即升级
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
