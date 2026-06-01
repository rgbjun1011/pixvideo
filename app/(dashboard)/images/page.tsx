"use client";

import { useState, useCallback, useRef } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, downloadImage, generateId } from "@/lib/utils";
import { removeBackgroundClient } from "@/lib/ai/background-removal";
import { generateImagesViaPollinations } from "@/lib/ai/pollinations";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Upload,
  X,
  Sparkles,
  Image as ImageIcon,
  Wand2,
  Download,
  Copy,
  Check,
  Loader2,
  Shuffle,
  Settings2,
  Layers,
  Globe,
  ChevronRight,
} from "lucide-react";

type Mode = "background" | "scene" | "model" | "batch";
type Platform = "amazon" | "shopify" | "tiktok" | "ebay" | "instagram" | "facebook";
type SceneCategory = "lifestyle" | "studio" | "outdoor" | "kitchen" | "bedroom" | "office";

const sceneTemplates: Record<SceneCategory, { name: string; prompt: string; gradient: string }[]> = {
  lifestyle: [
    { name: "温馨客厅", prompt: "product on a cozy living room coffee table, warm natural light, lifestyle photography", gradient: "from-amber-200 to-orange-300" },
    { name: "明亮厨房", prompt: "product on a modern bright kitchen counter, soft morning light, clean aesthetic", gradient: "from-yellow-200 to-amber-300" },
    { name: "卧室梳妆台", prompt: "product on an elegant vanity table, soft pink lighting, fashion photography", gradient: "from-rose-200 to-pink-300" },
  ],
  studio: [
    { name: "纯白背景", prompt: "product on pure white background, soft studio lighting, e-commerce ready", gradient: "from-slate-100 to-slate-200" },
    { name: "渐变背景", prompt: "product on gradient background, modern minimalist, e-commerce hero shot", gradient: "from-blue-200 to-purple-300" },
    { name: "极简阴影", prompt: "product with subtle soft shadow on white, professional catalog photo", gradient: "from-gray-200 to-slate-300" },
  ],
  outdoor: [
    { name: "户外野餐", prompt: "product on grass at outdoor picnic, golden hour, lifestyle ad", gradient: "from-green-200 to-emerald-300" },
    { name: "咖啡店", prompt: "product on a rustic cafe wooden table, coffee beans, cozy atmosphere", gradient: "from-amber-200 to-yellow-300" },
    { name: "海边日落", prompt: "product on beach at sunset, warm orange light, dreamy aesthetic", gradient: "from-orange-300 to-rose-400" },
  ],
  kitchen: [
    { name: "大理石台面", prompt: "product on white marble kitchen counter, modern home, food photography style", gradient: "from-stone-200 to-stone-300" },
    { name: "木制料理板", prompt: "product on wooden cutting board, fresh ingredients, recipe blog style", gradient: "from-amber-200 to-yellow-200" },
  ],
  bedroom: [
    { name: "卧室梳妆", prompt: "product on dressing table, soft morning window light, fashion flat lay", gradient: "from-rose-200 to-pink-200" },
    { name: "床品场景", prompt: "product on white bed sheets, cozy bedroom, lifestyle catalog", gradient: "from-pink-100 to-rose-200" },
  ],
  office: [
    { name: "办公桌面", prompt: "product on modern clean desk, laptop in background, professional work setup", gradient: "from-slate-200 to-blue-200" },
    { name: "会议室", prompt: "product on glass conference table, modern office, corporate photography", gradient: "from-cyan-200 to-blue-300" },
  ],
};

const modelOptions = [
  { id: "young_woman", name: "年轻女性", emoji: "👩" },
  { id: "young_man", name: "年轻男性", emoji: "👨" },
  { id: "mature_woman", name: "成熟女性", emoji: "👩‍💼" },
  { id: "mature_man", name: "成熟男性", emoji: "👨‍💼" },
  { id: "child", name: "儿童", emoji: "🧒" },
  { id: "elder", name: "长者", emoji: "👵" },
];

const platforms: { id: Platform; name: string; size: string; icon: string }[] = [
  { id: "amazon", name: "Amazon", size: "2000×2000", icon: "🛒" },
  { id: "shopify", name: "Shopify", size: "2048×2048", icon: "🛍️" },
  { id: "tiktok", name: "TikTok Shop", size: "1080×1920", icon: "🎵" },
  { id: "ebay", name: "eBay", size: "1600×1600", icon: "📦" },
  { id: "instagram", name: "Instagram", size: "1080×1080", icon: "📸" },
  { id: "facebook", name: "Facebook", size: "1200×1200", icon: "👍" },
];

export default function ImagesPage() {
  const [mode, setMode] = useState<Mode>("background");
  const uploadedImage = useAppStore((s) => s.uploadedProductImage);
  const setUploadedImage = useAppStore((s) => s.setUploadedProductImage);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{ id: string; url: string; type: string; label: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const addAsset = useAppStore((s) => s.addAsset);
  const incrementUsage = useAppStore((s) => s.incrementUsage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 场景图设置
  const [sceneCategory, setSceneCategory] = useState<SceneCategory>("lifestyle");
  const [selectedSceneIdx, setSelectedSceneIdx] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");

  // 模特设置
  const [selectedModel, setSelectedModel] = useState("young_woman");
  const [modelPose, setModelPose] = useState("standing");

  // 平台适配
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["amazon"]);

  // 品牌色（用于品牌风格库）
  const [brandColors, setBrandColors] = useState<string[]>(["#2563eb", "#06b6d4"]);
  const [customColor, setCustomColor] = useState("#8b5cf6");

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("请上传图片文件");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("图片大小不能超过 20MB");
      return;
    }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setResults([]);
    toast.success("图片上传成功");
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const generate = async () => {
    if (!uploadedImage) {
      toast.error("请先上传产品图");
      return;
    }
    setIsProcessing(true);
    setResults([]);

    try {
      if (mode === "background") {
        // 客户端背景移除（@imgly/background-removal 在浏览器跑）
        toast.info("首次使用需下载模型 (~25MB)，请稍候...");
        const data = await removeBackgroundClient(uploadedImage, (progress) => {
          // 可以更新 UI 进度
        });
        const resultItems = [
          { id: generateId(), url: data.image, type: "background-removed", label: "透明背景" },
          { id: generateId(), url: data.whiteBg, type: "white-bg", label: "白底主图" },
        ];
        setResults(resultItems);
        // 存到全局 store
        addAsset({
          type: "image",
          name: "背景移除",
          thumbnail: data.whiteBg,
          url: data.whiteBg,
          count: resultItems.length,
          mode: "background",
          cost: 0.05,
          status: "done",
        });
        incrementUsage("image", resultItems.length, 0.05);
        toast.success("生成完成！");
      } else if (mode === "scene") {
        // 场景图生成（直接调 Pollinations，绕过 Next.js API 路由问题）
        const scene = sceneTemplates[sceneCategory][selectedSceneIdx];
        const prompt = customPrompt || scene.prompt;
        const images = await generateImagesViaPollinations(
          `${prompt}, high quality, professional product photography, 4k`,
          3
        );
        const resultItems = images.map((url, i) => ({
          id: generateId(),
          url,
          type: "scene",
          label: `场景图 ${i + 1}`,
        }));
        setResults(resultItems);
        addAsset({
          type: "image",
          name: `AI 场景图 - ${scene.name}`,
          thumbnail: images[0],
          url: images[0],
          count: images.length,
          mode: "scene",
          cost: 0.15,
          status: "done",
        });
        incrementUsage("image", images.length, 0.15);
        toast.success(`已生成 ${images.length} 张场景图`);
      } else if (mode === "model") {
        // AI 模特图
        const model = modelOptions.find((m) => m.id === selectedModel);
        const prompt = `A ${model?.name} model wearing/using the product, ${modelPose} pose, professional fashion photography, studio lighting`;
        const images = await generateImagesViaPollinations(prompt, 3);
        const resultItems = images.map((url, i) => ({
          id: generateId(),
          url,
          type: "model",
          label: `${model?.name} ${i + 1}`,
        }));
        setResults(resultItems);
        addAsset({
          type: "image",
          name: `AI 模特图 - ${model?.name}`,
          thumbnail: images[0],
          url: images[0],
          count: images.length,
          mode: "model",
          cost: 0.18,
          status: "done",
        });
        incrementUsage("image", images.length, 0.18);
        toast.success(`已生成 ${images.length} 张模特图`);
      } else if (mode === "batch") {
        // 批量处理：组合所有
        toast.info("批量模式将依次生成 4 种类型，预计 1-2 分钟");
        const allResults: typeof results = [];

        // 1. 背景移除（客户端）
        const bgData = await removeBackgroundClient(uploadedImage);
        allResults.push(
          { id: generateId(), url: bgData.whiteBg, type: "white-bg", label: "白底主图" },
          { id: generateId(), url: bgData.image, type: "transparent", label: "透明背景" }
        );

        // 2. 场景图（直接调 Pollinations）
        const sceneImages = await generateImagesViaPollinations(
          "professional product in lifestyle setting, soft natural lighting, 4k",
          2
        );
        sceneImages.forEach((url, i) => {
          allResults.push({ id: generateId(), url, type: "scene", label: `场景图 ${i + 1}` });
        });

        setResults(allResults);
        addAsset({
          type: "image",
          name: "批量处理 - 全套素材",
          thumbnail: allResults[0]?.url || bgData.whiteBg,
          url: allResults[0]?.url || bgData.whiteBg,
          count: allResults.length,
          mode: "batch",
          cost: 0.35,
          status: "done",
        });
        incrementUsage("image", allResults.length, 0.35);
        toast.success(`批量生成 ${allResults.length} 张图完成！`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "生成失败，请重试");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setResults([]);
    toast.success("已清空，可重新上传");
  };

  return (
    <>
      <Topbar
        title="AI 商品图引擎"
        subtitle="上传一张产品图，3 秒出全套素材"
      />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Mode Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 rounded-xl bg-slate-100 w-fit">
          {[
            { id: "background", label: "背景移除", icon: Wand2 },
            { id: "scene", label: "AI 场景图", icon: ImageIcon },
            { id: "model", label: "AI 模特图", icon: Sparkles },
            { id: "batch", label: "批量处理", icon: Layers },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as Mode)}
              className={cn(
                "flex items-center gap-2 px-4 h-9 rounded-lg text-sm font-medium transition-all",
                mode === m.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <m.icon className="w-4 h-4" />
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Upload + Settings */}
          <div className="lg:col-span-5 space-y-4">
            {/* Upload Zone */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">产品图</div>
                  <div className="text-xs text-slate-500">支持 JPG · PNG · WebP</div>
                </div>
                {uploadedImage && (
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    <X className="w-3.5 h-3.5" />
                    重新上传
                  </Button>
                )}
              </div>

              {!uploadedImage ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn("upload-zone m-4 p-10 rounded-xl cursor-pointer text-center", dragging && "dragging")}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                    <Upload className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-semibold text-slate-900">拖入产品图</div>
                  <div className="text-xs text-slate-500 mt-1">或点击选择文件 · 最大 20MB</div>
                </div>
              ) : (
                <div className="m-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative aspect-square">
                  <img
                    src={uploadedImage}
                    alt="上传的产品图"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </Card>

            {/* Mode-specific Settings */}
            {mode === "scene" && uploadedImage && (
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Settings2 className="w-4 h-4" />
                  场景设置
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    场景分类
                  </label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(Object.keys(sceneTemplates) as SceneCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSceneCategory(cat);
                          setSelectedSceneIdx(0);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          sceneCategory === cat
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {cat === "lifestyle" && "生活"}
                        {cat === "studio" && "工作室"}
                        {cat === "outdoor" && "户外"}
                        {cat === "kitchen" && "厨房"}
                        {cat === "bedroom" && "卧室"}
                        {cat === "office" && "办公"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    场景模板
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {sceneTemplates[sceneCategory].map((s, i) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSceneIdx(i)}
                        className={cn(
                          "rounded-lg overflow-hidden border-2 transition-all text-left",
                          selectedSceneIdx === i
                            ? "border-blue-500 ring-2 ring-blue-500/20"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className={cn("h-16 bg-gradient-to-br", s.gradient)} />
                        <div className="px-2 py-1.5 text-[10px] font-medium text-slate-700 bg-white">
                          {s.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    自定义描述（可选）
                  </label>
                  <Textarea
                    className="mt-2"
                    placeholder="例：放在白色大理石上，旁边有玫瑰花..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={2}
                  />
                </div>
              </Card>
            )}

            {mode === "model" && uploadedImage && (
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Settings2 className="w-4 h-4" />
                  模特设置
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    模特类型
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {modelOptions.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={cn(
                          "p-3 rounded-lg border-2 text-center transition-all",
                          selectedModel === m.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className="text-2xl mb-1">{m.emoji}</div>
                        <div className="text-[10px] font-medium text-slate-700">{m.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    姿势
                  </label>
                  <div className="mt-2 flex gap-1.5">
                    {["standing", "sitting", "walking", "lifestyle"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setModelPose(p)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          modelPose === p
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {p === "standing" && "站立"}
                        {p === "sitting" && "坐姿"}
                        {p === "walking" && "行走"}
                        {p === "lifestyle" && "生活方式"}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {(mode === "background" || mode === "batch") && uploadedImage && (
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Globe className="w-4 h-4" />
                  平台适配
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
                      <div className="text-lg">{p.icon}</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.size}</div>
                      </div>
                      {selectedPlatforms.includes(p.id) && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {/* Generate Button */}
            <Button
              size="xl"
              className="w-full"
              onClick={generate}
              disabled={!uploadedImage || isProcessing}
            >
              {isProcessing ? (
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
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden min-h-[600px]">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">生成结果</div>
                  <div className="text-xs text-slate-500">
                    {results.length > 0
                      ? `${results.length} 张图 · 可单独下载或一键打包`
                      : "上传图片后开始生成"}
                  </div>
                </div>
                {results.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Shuffle className="w-3.5 h-3.5" />
                      重新生成
                    </Button>
                    <Button size="sm">
                      <Download className="w-3.5 h-3.5" />
                      全部下载
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4">
                {!uploadedImage ? (
                  <EmptyState />
                ) : isProcessing ? (
                  <ProcessingState mode={mode} />
                ) : results.length > 0 ? (
                  <ResultsGrid results={results} />
                ) : (
                  <ReadyState onGenerate={generate} />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <ImageIcon className="w-8 h-8 text-slate-400" />
      </div>
      <div className="font-semibold text-slate-900">还没有结果</div>
      <div className="text-sm text-slate-500 mt-1 max-w-xs">
        上传产品图后，点击「开始生成」即可看到 AI 生成的素材
      </div>
    </div>
  );
}

function ProcessingState({ mode }: { mode: Mode }) {
  const steps: Record<Mode, string[]> = {
    background: ["分析图片主体", "识别前景元素", "移除背景", "输出 PNG"],
    scene: ["理解产品", "匹配场景模板", "生成 3 张候选", "后处理优化"],
    model: ["理解产品类型", "匹配模特类型", "生成 3 张候选", "姿态优化"],
    batch: ["背景移除", "生成场景图", "生成模特图", "打包输出"],
  };

  return (
    <div className="py-12">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-xl animate-pulse" />
        </div>
        <div className="font-semibold text-slate-900 mt-2">AI 正在工作中...</div>
        <div className="text-sm text-slate-500 mt-1">通常需要 3-10 秒</div>
      </div>

      <div className="mt-8 max-w-md mx-auto space-y-3">
        {steps[mode].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.5 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">
              {i + 1}
            </div>
            <div className="text-sm text-slate-700 flex-1">{step}</div>
            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReadyState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <div className="font-semibold text-slate-900">准备就绪</div>
      <div className="text-sm text-slate-500 mt-1 max-w-xs mb-6">
        配置好左侧参数后，点击下方按钮开始生成
      </div>
      <Button onClick={onGenerate}>
        <Sparkles className="w-4 h-4" />
        开始生成
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

function ResultsGrid({
  results,
}: {
  results: { id: string; url: string; type: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {results.map((r) => (
        <ResultCard key={r.id} result={r} />
      ))}
    </div>
  );
}

function ResultCard({ result }: { result: { id: string; url: string; type: string; label: string } }) {
  const [copied, setCopied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover-lift"
    >
      <div className="aspect-square bg-slate-50 relative overflow-hidden">
        <img
          src={result.url}
          alt={result.label}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9"
            onClick={() => {
              navigator.clipboard.writeText(result.url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              toast.success("已复制链接");
            }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            size="icon"
            className="h-9 w-9"
            onClick={() => downloadImage(result.url, `pixvideo-${result.id}.png`)}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-2.5 flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-700">{result.label}</div>
        <Badge variant="success" size="sm">
          <Check className="w-2.5 h-2.5" />
          完成
        </Badge>
      </div>
    </motion.div>
  );
}
