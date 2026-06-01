"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Video as VideoIcon,
  Zap,
  Check,
  Star,
  Play,
  Wand2,
  Layers,
  Globe,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ============= HEADER =============
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
            P
          </div>
          <span className="font-bold text-lg tracking-tight">PixVideo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-slate-900 transition-colors">
            产品
          </Link>
          <Link href="#how" className="hover:text-slate-900 transition-colors">
            工作流
          </Link>
          <Link href="#pricing" className="hover:text-slate-900 transition-colors">
            定价
          </Link>
          <Link href="#testimonials" className="hover:text-slate-900 transition-colors">
            客户
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              登录
            </Button>
          </Link>
          <Link href="/images">
            <Button size="sm">
              免费试用
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link href="#features" onClick={() => setMobileOpen(false)}>
                产品
              </Link>
              <Link href="#how" onClick={() => setMobileOpen(false)}>
                工作流
              </Link>
              <Link href="#pricing" onClick={() => setMobileOpen(false)}>
                定价
              </Link>
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    登录
                  </Button>
                </Link>
                <Link href="/images" className="flex-1">
                  <Button className="w-full">免费试用</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ============= HERO =============
function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-glow overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary" size="lg" className="mb-6">
            <Sparkles className="w-3 h-3" />
            2026 全新发布 · 限时免费体验
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance"
        >
          外贸电商的<br className="sm:hidden" />
          <span className="text-gradient">AI 素材工厂</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto text-pretty"
        >
          一个商品链接 → 10 张商品图 + 10 条带货视频 + 6 个平台适配，3 分钟出。
          <br className="hidden sm:block" />
          月省 <strong className="text-slate-900">$2000</strong> 拍摄费。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link href="/images">
            <Button size="xl" className="w-full sm:w-auto">
              <Sparkles className="w-4 h-4" />
              免费生成第一张图
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#how">
            <Button size="xl" variant="outline" className="w-full sm:w-auto">
              <Play className="w-4 h-4" />
              看 30 秒演示
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            无需信用卡
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            20 张图免费额度
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            1 分钟上手
          </div>
        </motion.div>

        {/* Hero Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl border border-slate-200/80 bg-white shadow-elevated overflow-hidden">
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="ml-4 text-xs text-slate-500 font-mono">
                app.pixvideo.io
              </div>
            </div>
            <HeroPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[400px]">
      {/* Sidebar */}
      <div className="md:col-span-3 bg-slate-50 border-r border-slate-200 p-4">
        <div className="text-xs font-semibold text-slate-900 mb-3">工作区</div>
        {["上传产品图", "白底图生成", "生活场景图", "AI 模特图", "批量处理", "品牌风格库"].map(
          (item, i) => (
            <div
              key={item}
              className={cn(
                "px-3 py-2 rounded-lg text-xs mb-1 transition-colors",
                i === 0
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {item}
            </div>
          )
        )}
        <div className="mt-6 text-xs font-semibold text-slate-900 mb-3">平台适配</div>
        <div className="flex flex-wrap gap-1.5">
          {["Amazon", "Shopify", "eBay", "TikTok", "FB", "IG"].map((p) => (
            <span
              key={p}
              className="px-2 py-1 rounded text-[10px] font-medium bg-white border border-slate-200 text-slate-700"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Main: Upload zone */}
      <div className="md:col-span-5 p-6 border-r border-slate-200 bg-white">
        <div className="upload-zone rounded-xl p-8 h-full flex flex-col items-center justify-center min-h-[320px]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <ImageIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-sm font-semibold text-slate-900">拖入产品图</div>
          <div className="text-xs text-slate-500 mt-1">支持 JPG · PNG · WebP · 最多 50 张</div>
          <Button size="sm" className="mt-4">
            选择文件
          </Button>
        </div>
      </div>

      {/* Right: Generated results */}
      <div className="md:col-span-4 p-4 bg-slate-50/50">
        <div className="text-xs font-semibold text-slate-900 mb-3 flex items-center justify-between">
          <span>生成结果</span>
          <span className="text-blue-600">4 / 4</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "白底主图", gradient: "from-slate-100 to-slate-200" },
            { name: "场景图", gradient: "from-amber-100 to-orange-200" },
            { name: "模特图", gradient: "from-rose-100 to-pink-200" },
            { name: "社交图", gradient: "from-blue-100 to-cyan-200" },
          ].map((item) => (
            <div
              key={item.name}
              className="aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white hover-lift"
            >
              <div
                className={cn(
                  "w-full h-3/4 bg-gradient-to-br flex items-center justify-center",
                  item.gradient
                )}
              >
                <div className="w-12 h-12 rounded bg-white/60 backdrop-blur" />
              </div>
              <div className="px-2 py-1.5 text-[10px] font-medium text-slate-700">
                {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-[11px] text-slate-600 flex-1">3 张已完成，可下载</div>
          <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]">
            全部下载
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============= STATS =============
function Stats() {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "1200万+", label: "跨境电商卖家" },
            { num: "3 分钟", label: "从URL到素材" },
            { num: "60%+", label: "毛利率" },
            { num: "$1.79M", label: "目标 ARR" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl md:text-3xl font-bold text-slate-900">{s.num}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= FEATURES =============
function Features() {
  const features = [
    {
      icon: ImageIcon,
      title: "AI 商品图引擎",
      desc: "白底图、场景图、模特图一键生成。500+ 场景模板，免写提示词，3 秒出图。",
      color: "from-blue-500 to-cyan-500",
      href: "/images",
    },
    {
      icon: VideoIcon,
      title: "AI 视频引擎",
      desc: "TikTok 爆款复刻 + 数字人口播 + 多模型路由。一晚上测 10 个新品的爆款流水线。",
      color: "from-purple-500 to-pink-500",
      href: "/videos",
    },
    {
      icon: Wand2,
      title: "品牌一致性",
      desc: "上传品牌 VI → AI 自动提取色系/字体/风格 → 所有素材统一调性。一次设置，永久一致。",
      color: "from-amber-500 to-orange-500",
      href: "/images",
    },
    {
      icon: Layers,
      title: "批量矩阵生成",
      desc: "一次设置 → 批量出 50 条视频变体。铺货型卖家一天测几十个品的核心功能。",
      color: "from-emerald-500 to-teal-500",
      href: "/videos",
    },
    {
      icon: Globe,
      title: "多平台适配",
      desc: "Amazon / Shopify / TikTok Shop / eBay / IG / FB，6 大平台尺寸内置，无需手动裁切。",
      color: "from-indigo-500 to-blue-500",
      href: "/images",
    },
    {
      icon: Target,
      title: "多语言数字人",
      desc: "英/西/日/德/法/...一条视频自动生成多语言版本。覆盖亚马逊多站点。",
      color: "from-rose-500 to-red-500",
      href: "/videos",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="primary" className="mb-4">
            产品矩阵
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            两个引擎，<br />
            <span className="text-gradient">一个工作流</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            市面上唯一同时做好「图片 + 视频」一站式的工具。
            卖家不用在 5 个工具之间切换。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={f.href}>
                <div className="group p-6 rounded-2xl border border-slate-200 bg-white hover-lift cursor-pointer h-full">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform",
                      f.color
                    )}
                  >
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    立即体验
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= HOW IT WORKS =============
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "上传产品图 / 链接",
      desc: "支持单张图、批量图、ASIN 链接、URL，自动解析商品信息。",
    },
    {
      step: "02",
      title: "选风格 / 模板",
      desc: "500+ 场景模板 · 5 大类爆款视频模板 · 一次设置永久复用品牌风格。",
    },
    {
      step: "03",
      title: "AI 一键生成",
      desc: "图片 3 秒、视频 1-2 分钟。背景移除、场景渲染、模特试穿全自动。",
    },
    {
      step: "04",
      title: "下载 / 发布",
      desc: "导出 6 大平台尺寸，一键发布到 TikTok / Amazon / Shopify。",
    },
  ];

  return (
    <section id="how" className="py-20 md:py-32 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="purple" className="mb-4">
            工作流
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            4 步出片，<br />
            比摄影师快 100 倍
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl bg-white border border-slate-200"
            >
              <div className="text-5xl font-bold text-gradient opacity-30 mb-3">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-slate-300 -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= PERSONAS =============
function Personas() {
  const personas = [
    {
      avatar: "L",
      gradient: "from-blue-500 to-cyan-500",
      name: "Lisa",
      role: "精品站卖家",
      pain: "每月推 5 个新品，要 1 套主图 + 5 张场景图 + 1 条视频",
      saving: "月省 $2,000 外包费",
    },
    {
      avatar: "M",
      gradient: "from-purple-500 to-pink-500",
      name: "Mike",
      role: "铺货型卖家",
      pain: "每天测 20+ 新品，每个品要 5-10 条视频投流",
      saving: "1 小时出 10 条视频",
    },
    {
      avatar: "S",
      gradient: "from-amber-500 to-orange-500",
      name: "Sara",
      role: "代运营工作室",
      pain: "客户每月都有新素材需求，人天成本是瓶颈",
      saving: "设计师不用加班",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="success" className="mb-4">
            为谁而生
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            不是给所有人，
            <br />
            <span className="text-gradient">是为这 3 类人</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            25-40 万家有付费意愿+能力的跨境卖家。
            不是"1200 万"的虚数。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg",
                    p.gradient
                  )}
                >
                  {p.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{p.name}</div>
                  <div className="text-sm text-slate-500">{p.role}</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    痛点
                  </div>
                  <div className="text-slate-700">{p.pain}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    用 PixVideo
                  </div>
                  <div className="text-blue-600 font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    {p.saving}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= PRICING =============
function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="warning" className="mb-4">
            简单定价
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            比请一个外包便宜
            <br />
            <span className="text-gradient">比请一个设计师快</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white">
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Starter
            </div>
            <div className="mt-2">
              <span className="text-5xl font-bold text-slate-900">$39</span>
              <span className="text-slate-500 ml-1">/月</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">适合个人卖家</p>
            <Link href="/images" className="block mt-6">
              <Button variant="outline" className="w-full">
                开始使用
              </Button>
            </Link>
            <ul className="mt-6 space-y-3 text-sm">
              {["100 张商品图", "20 条视频/月", "基础模板", "3 平台适配", "邮件支持"].map(
                (f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Pro - Popular */}
          <div className="p-8 rounded-2xl border-2 border-blue-500 bg-white relative shadow-elevated">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              最受欢迎
            </div>
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Pro
            </div>
            <div className="mt-2">
              <span className="text-5xl font-bold text-slate-900">$79</span>
              <span className="text-slate-500 ml-1">/月</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">适合中小卖家</p>
            <Link href="/images" className="block mt-6">
              <Button className="w-full">
                开始使用
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "500 张商品图",
                "100 条视频/月",
                "场景图 + 模特图 + 数字人",
                "爆款复刻引擎",
                "品牌风格库",
                "6 平台全尺寸",
                "批量处理",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white">
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Enterprise
            </div>
            <div className="mt-2">
              <span className="text-5xl font-bold text-slate-900">$199</span>
              <span className="text-slate-500 ml-1">/月</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">团队 / 代运营</p>
            <Link href="/images" className="block mt-6">
              <Button variant="outline" className="w-full">
                联系销售
              </Button>
            </Link>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "2000 张商品图",
                "500 条视频/月",
                "所有 Pro 功能",
                "API 接入",
                "无限品牌库",
                "优先队列",
                "专属客服",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= TESTIMONIALS / SOCIAL PROOF =============
function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="purple" className="mb-4">
            早期信号
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            来自种子用户的
            <br />
            <span className="text-gradient-warm">真实反馈</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Lisa",
              role: "Amazon FBA 卖家",
              avatar: "L",
              gradient: "from-blue-500 to-cyan-500",
              quote:
                "用 PixVideo 一个月省了 2000 美金的拍摄费。主图质量比我之前外包的还要稳定。",
              rating: 5,
            },
            {
              name: "Mike",
              role: "TikTok Shop 铺货",
              avatar: "M",
              gradient: "from-purple-500 to-pink-500",
              quote:
                "1 小时出 10 条视频，每条都基于已爆款结构。现在测新品的效率是之前的 10 倍。",
              rating: 5,
            },
            {
              name: "Sara",
              role: "代运营工作室主理人",
              avatar: "S",
              gradient: "from-amber-500 to-orange-500",
              quote:
                "我设计师不用加班了。我们现在能接比之前多 3 倍的客户，利润还更高。",
              rating: 5,
            },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-200 bg-white"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold",
                    t.gradient
                  )}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= CTA =============
function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto text-white">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              准备好升级你的
              <br />
              素材生产线了吗？
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              20 张图 + 1 条视频免费试用，1 分钟上手。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/images">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Sparkles className="w-4 h-4" />
                  免费开始
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  size="xl"
                  variant="ghost"
                  className="w-full sm:w-auto text-white hover:bg-white/10"
                >
                  查看定价
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= FOOTER =============
function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                P
              </div>
              <span className="font-bold text-lg">PixVideo</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 max-w-xs">
              外贸电商的 AI 素材工厂。图片 + 视频一站式。
            </p>
          </div>
          {[
            { title: "产品", links: ["AI 商品图", "AI 视频", "BizVid 小商家版", "定价"] },
            { title: "资源", links: ["文档", "案例", "博客", "API"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-semibold text-slate-900 text-sm mb-3">{col.title}</div>
              <ul className="space-y-2 text-sm text-slate-500">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="hover:text-slate-900 transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© 2026 PixVideo. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-900">
              隐私政策
            </Link>
            <Link href="#" className="hover:text-slate-900">
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============= MAIN PAGE =============
export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Personas />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
