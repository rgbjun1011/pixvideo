"use client";

import { useState, useRef } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, generateId } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Video as VideoIcon,
  Sparkles,
  Upload,
  X,
  Loader2,
  Play,
  Download,
  Check,
  Link2,
  Mic2,
  Globe,
  Layers,
  Copy,
  ChevronRight,
  Clock,
  Zap,
} from "lucide-react";

type VideoTemplate = "ugc" | "demo" | "unbox" | "pain" | "compare";
type Platform = "tiktok" | "reels" | "shorts" | "amazon" | "shopify";
type Language = "en" | "es" | "ja" | "de" | "fr" | "pt";

const templates: { id: VideoTemplate; name: string; emoji: string; desc: string; gradient: string; badge?: string }[] = [
  { id: "ugc", name: "UGC 种草", emoji: "🌟", desc: "用户视角开箱，最容易爆", gradient: "from-pink-400 to-rose-500", badge: "最火" },
  { id: "demo", name: "产品演示", emoji: "📦", desc: "360°展示产品卖点", gradient: "from-blue-400 to-cyan-500" },
  { id: "unbox", name: "开箱种草", emoji: "🎁", desc: "拆包过程+惊喜感", gradient: "from-amber-400 to-orange-500" },
  { id: "pain", name: "痛点解决", emoji: "💡", desc: "先讲痛点再讲产品", gradient: "from-purple-400 to-pink-500" },
  { id: "compare", name: "效果对比", emoji: "⚡", desc: "before/after 对比", gradient: "from-emerald-400 to-teal-500" },
];

const platforms: { id: Platform; name: string; ratio: string }[] = [
  { id: "tiktok", name: "TikTok", ratio: "9:16" },
  { id: "reels", name: "Instagram Reels", ratio: "9:16" },
  { id: "shorts", name: "YouTube Shorts", ratio: "9:16" },
  { id: "amazon", name: "Amazon Video", ratio: "16:9" },
  { id: "shopify", name: "Shopify", ratio: "1:1" },
];

const languages: { id: Language; name: string; flag: string }[] = [
  { id: "en", name: "英语", flag: "🇺🇸" },
  { id: "es", name: "西班牙", flag: "🇪🇸" },
  { id: "ja", name: "日语", flag: "🇯🇵" },
  { id: "de", name: "德语", flag: "🇩🇪" },
  { id: "fr", name: "法语", flag: "🇫🇷" },
  { id: "pt", name: "葡萄牙", flag: "🇧🇷" },
];

type VideoJob = {
  id: string;
  status: "queued" | "processing" | "done" | "error";
  progress: number;
  template: VideoTemplate;
  language: Language;
  thumbnail?: string;
  url?: string;
  duration: string;
};

export default function VideosPage() {
  const [inputType, setInputType] = useState<"url" | "image" | "text">("url");
  const [urlInput, setUrlInput] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productDescription, setProductDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate>("ugc");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["tiktok"]);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(["en"]);
  const [quantity, setQuantity] = useState(3);
  const [digitalHuman, setDigitalHuman] = useState(false);
  const [jobs, setJobs] = useState<VideoJob[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("请上传图片");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setProductImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const startGenerate = async () => {
    // 校验
    if (inputType === "url" && !urlInput) {
      toast.error("请输入商品链接");
      return;
    }
    if (inputType === "image" && !productImage) {
      toast.error("请上传产品图");
      return;
    }
    if (inputType === "text" && !productName) {
      toast.error("请填写产品名");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("请至少选择一个平台");
      return;
    }

    setIsGenerating(true);
    const newJobs: VideoJob[] = [];

    // 为每个语言 × 平台生成视频
    const totalCount = Math.min(quantity, selectedLanguages.length * selectedPlatforms.length);
    for (let i = 0; i < totalCount; i++) {
      const lang = selectedLanguages[i % selectedLanguages.length];
      const job: VideoJob = {
        id: generateId(),
        status: "queued",
        progress: 0,
        template: selectedTemplate,
        language: lang,
        duration: "5s",
      };
      newJobs.push(job);
    }
    setJobs(newJobs);

    // 模拟异步处理流程
    for (let i = 0; i < newJobs.length; i++) {
      const jobId = newJobs[i].id;
      // queued -> processing
      setTimeout(() => {
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId ? { ...j, status: "processing", progress: 0 } : j))
        );

        // 进度更新
        const interval = setInterval(() => {
          setJobs((prev) => {
            const job = prev.find((j) => j.id === jobId);
            if (!job) {
              clearInterval(interval);
              return prev;
            }
            const newProgress = Math.min(job.progress + Math.random() * 15, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
              return prev.map((j) =>
                j.id === jobId
                  ? {
                      ...j,
                      status: "done",
                      progress: 100,
                      url: `https://picsum.photos/seed/${jobId}/720/1280`,
                      thumbnail: `https://picsum.photos/seed/${jobId}/360/640`,
                    }
                  : j
              );
            }
            return prev.map((j) => (j.id === jobId ? { ...j, progress: newProgress } : j));
          });
        }, 500);
      }, i * 800);
    }

    // 全部完成
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`已生成 ${totalCount} 条视频！`);
    }, totalCount * 1000);
  };

  const clearAll = () => {
    setUrlInput("");
    setProductName("");
    setProductImage(null);
    setProductDescription("");
    setJobs([]);
  };

  return (
    <>
      <Topbar
        title="AI 带货视频引擎"
        subtitle="爆款复刻 + 批量测品 + 多语言数字人"
      />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Config */}
          <div className="lg:col-span-5 space-y-4">
            {/* Input Method */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <div className="font-semibold text-sm text-slate-900">输入方式</div>
                <div className="text-xs text-slate-500 mt-0.5">3 种方式任选其一</div>
              </div>

              <div className="p-3 flex gap-1.5 border-b border-slate-100">
                {[
                  { id: "url", label: "商品链接", icon: Link2 },
                  { id: "image", label: "产品图", icon: Upload },
                  { id: "text", label: "文字描述", icon: Sparkles },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setInputType(m.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-medium transition-all",
                      inputType === m.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <m.icon className="w-3.5 h-3.5" />
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {inputType === "url" && (
                  <div>
                    <Input
                      placeholder="粘贴 Amazon ASIN 或 商品 URL..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI 自动爬取商品图、卖点、价格
                    </div>
                  </div>
                )}

                {inputType === "image" && (
                  <div>
                    {!productImage ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="upload-zone rounded-xl p-6 cursor-pointer text-center"
                      >
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <div className="text-sm font-medium text-slate-700">点击上传产品图</div>
                        <div className="text-xs text-slate-500 mt-1">支持 JPG · PNG</div>
                      </div>
                    ) : (
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <img
                          src={productImage}
                          alt="产品图"
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={() => setProductImage(null)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0] || null)}
                    />
                  </div>
                )}

                {inputType === "text" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        产品名
                      </label>
                      <Input
                        className="mt-1.5"
                        placeholder="例：无线降噪耳机"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        卖点描述（可选）
                      </label>
                      <Textarea
                        className="mt-1.5"
                        rows={3}
                        placeholder="Hi-Fi 音质、40h 续航、主动降噪..."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Template Selection */}
            <Card className="p-4 space-y-3">
              <div className="font-semibold text-sm">视频模板</div>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={cn(
                      "relative p-3 rounded-xl border-2 text-left transition-all",
                      selectedTemplate === t.id
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    {t.badge && (
                      <Badge variant="danger" size="sm" className="absolute -top-2 right-2">
                        {t.badge}
                      </Badge>
                    )}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl mb-2",
                        t.gradient
                      )}
                    >
                      {t.emoji}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Platforms */}
            <Card className="p-4 space-y-3">
              <div className="font-semibold text-sm flex items-center justify-between">
                <span>目标平台</span>
                <span className="text-xs text-slate-500 font-normal">
                  已选 {selectedPlatforms.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPlatforms((prev) =>
                        prev.includes(p.id)
                          ? prev.filter((x) => x !== p.id)
                          : [...prev, p.id]
                      );
                    }}
                    className={cn(
                      "p-2.5 rounded-lg border-2 text-left transition-all flex items-center gap-2",
                      selectedPlatforms.includes(p.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-500">{p.ratio}</div>
                    </div>
                    {selectedPlatforms.includes(p.id) && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Languages & Digital Human */}
            <Card className="p-4 space-y-3">
              <div className="font-semibold text-sm">多语言 & 数字人</div>

              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  目标语言
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setSelectedLanguages((prev) =>
                          prev.includes(l.id)
                            ? prev.filter((x) => x !== l.id)
                            : [...prev, l.id]
                        );
                      }}
                      className={cn(
                        "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
                        selectedLanguages.includes(l.id)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      <span>{l.flag}</span>
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Mic2 className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">AI 数字人口播</div>
                    <div className="text-[11px] text-slate-500">自动对口型 · 多语言</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={digitalHuman}
                  onChange={(e) => setDigitalHuman(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
              </label>
            </Card>

            {/* Quantity & Generate */}
            <Card className="p-4 space-y-3">
              <div className="font-semibold text-sm">生成数量</div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 3, 5, 10, 20].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuantity(n)}
                    className={cn(
                      "h-10 rounded-lg text-sm font-semibold transition-all",
                      quantity === n
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500">
                将生成 {Math.min(quantity, selectedLanguages.length * selectedPlatforms.length)} 条视频
                （语言 × 平台）
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={startGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    开始生成
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Right: Jobs / Results */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden min-h-[600px]">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">生成队列</div>
                  <div className="text-xs text-slate-500">
                    {jobs.length > 0 ? `${jobs.length} 条视频` : "配置好左侧参数开始生成"}
                  </div>
                </div>
                {jobs.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    清空
                  </Button>
                )}
              </div>

              <div className="p-4">
                {jobs.length === 0 ? (
                  <EmptyVideoState />
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {jobs.map((job) => (
                        <VideoJobCard key={job.id} job={job} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyVideoState() {
  const previewItems = [
    { gradient: "from-pink-400 to-rose-500", title: "UGC 种草视频", emoji: "🌟" },
    { gradient: "from-blue-400 to-cyan-500", title: "产品演示", emoji: "📦" },
    { gradient: "from-amber-400 to-orange-500", title: "开箱种草", emoji: "🎁" },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
          <VideoIcon className="w-8 h-8 text-white" />
        </div>
        <div className="font-semibold text-slate-900 text-lg">准备开始批量测品？</div>
        <div className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          一次设置，AI 自动生成 10 条视频变体，覆盖多平台多语言
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
        {previewItems.map((p) => (
          <div
            key={p.title}
            className="aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group cursor-pointer"
          >
            <div
              className={cn(
                "w-full h-full bg-gradient-to-br flex items-center justify-center text-5xl",
                p.gradient
              )}
            >
              {p.emoji}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="text-xs font-semibold text-white">{p.title}</div>
              <div className="text-[10px] text-white/80 mt-0.5">5s · 1080×1920</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-4 h-4 text-slate-900 ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoJobCard({ job }: { job: VideoJob }) {
  const template = templates.find((t) => t.id === job.template)!;
  const lang = languages.find((l) => l.id === job.language)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-3 rounded-xl border border-slate-200 bg-white hover-lift"
    >
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="w-20 aspect-[9/16] rounded-lg overflow-hidden flex-shrink-0 relative bg-slate-100">
          {job.status === "done" && job.thumbnail ? (
            <img src={job.thumbnail} alt="" className="w-full h-full object-cover" />
          ) : (
            <div
              className={cn(
                "w-full h-full bg-gradient-to-br flex items-center justify-center text-2xl",
                template.gradient
              )}
            >
              {template.emoji}
            </div>
          )}
          {job.status === "done" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-sm text-slate-900">
                {template.name} · {lang.flag} {lang.name}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {job.duration}
                <span>·</span>
                <span>9:16</span>
              </div>
            </div>
            {job.status === "done" ? (
              <Badge variant="success" size="sm">
                <Check className="w-2.5 h-2.5" />
                完成
              </Badge>
            ) : job.status === "processing" ? (
              <Badge variant="primary" size="sm">
                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                生成中
              </Badge>
            ) : (
              <Badge variant="default" size="sm">
                排队中
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          {(job.status === "processing" || job.status === "queued") && (
            <div className="mt-2.5">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                <span>{Math.round(job.progress)}%</span>
                <span>预计还需 {Math.max(1, Math.round((100 - job.progress) / 20))}s</span>
              </div>
            </div>
          )}

          {/* Actions */}
          {job.status === "done" && (
            <div className="mt-2.5 flex items-center gap-1.5">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Play className="w-3 h-3" />
                预览
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Copy className="w-3 h-3" />
                复制
              </Button>
              <Button size="sm" className="h-7 text-xs">
                <Download className="w-3 h-3" />
                下载
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
