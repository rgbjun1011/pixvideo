"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore, formatRelativeTime } from "@/lib/store";
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
  const assets = useAppStore((s) => s.assets);
  const usage = useAppStore((s) => s.usageThisMonth);

  const recentAssets = assets.slice(0, 3);

  // 根据 Lisa/Mike/Sara 角色给动态问候
  const hour = new Date().getHours();
  const greeting = hour < 6 ? "深夜了" : hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好";

  // 根据用量给推荐
  const getRecommendation = () => {
    if (assets.length === 0) {
      return {
        title: "开始你的第一张图",
        desc: "上传产品图，3 秒出白底图、场景图、模特图",
        cta: "立即开始",
        href: "/images",
        gradient: "from-blue-500 to-cyan-500",
      };
    }
    if (usage.images > 0 && usage.videos === 0) {
      return {
        title: "试试 AI 视频引擎",
        desc: "你已经生成过图片，下一步试试爆款视频批量测品",
        cta: "去生成视频",
        href: "/videos",
        gradient: "from-purple-500 to-pink-500",
      };
    }
    return {
      title: "继续批量测品",
      desc: "用 AI 视频批量生成 10 条变体，找到下一个爆款",
      cta: "立即开始",
      href: "/videos",
      gradient: "from-amber-500 to-orange-500",
    };
  };

  const rec = getRecommendation();

  return (
    <>
      <Topbar
        title={`${greeting}，Lisa 👋`}
        subtitle={
          assets.length === 0
            ? "上传第一张产品图，开始 AI 素材之旅"
            : `已生成 ${usage.images} 张图、${usage.videos} 条视频`
        }
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
            { icon: TrendingUp, label: "本月生成", value: `${usage.images + usage.videos}`, color: "text-blue-600" },
            { icon: Zap, label: "节省成本", value: `$${(usage.images * 8 + usage.videos * 80).toFixed(0)}`, color: "text-emerald-600" },
            { icon: Clock, label: "项目数", value: `${assets.length}`, color: "text-purple-600" },
            { icon: Sparkles, label: "本月成本", value: `$${usage.cost.toFixed(2)}`, color: "text-amber-600" },
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
          <h2 className="text-lg font-semibold text-slate-900">
            {assets.length > 0 ? "最近项目" : "推荐开始"}
          </h2>
          {assets.length > 0 && (
            <Link
              href="/history"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部 →
            </Link>
          )}
        </div>

        {assets.length === 0 ? (
          <Link href={rec.href}>
            <Card className="p-8 hover-lift cursor-pointer relative overflow-hidden">
              <div
                className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${rec.gradient} opacity-10 blur-2xl`}
              />
              <div className="relative flex items-center gap-6">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${rec.gradient} flex items-center justify-center`}
                >
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900">{rec.title}</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{rec.desc}</p>
                </div>
                <Button className={`bg-gradient-to-r ${rec.gradient} text-white`}>
                  {rec.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </Link>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAssets.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Link href="/history">
                  <Card className="overflow-hidden hover-lift cursor-pointer">
                    <div className="h-32 bg-slate-100 relative">
                      {p.thumbnail ? (
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                      )}
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
                      <div className="font-semibold text-slate-900 line-clamp-1">{p.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {formatRelativeTime(p.createdAt)}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Upgrade Banner - 只在用量低于 80% 时显示 */}
        {usage.images < 400 && (
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
              <Link href="/billing">
                <Button className="bg-white text-slate-900 hover:bg-slate-100">
                  立即升级
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
