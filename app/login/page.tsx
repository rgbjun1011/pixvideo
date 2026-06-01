"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight, Loader2, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);
  const [email, setEmail] = useState("lisa@pixvideo.io");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 模拟登录
    await new Promise((r) => setTimeout(r, 800));
    setUser({
      name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()) || "Lisa",
      email,
      plan: "pro",
      avatar: (email[0] || "L").toUpperCase(),
    });
    setLoading(false);
    toast.success("登录成功！");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-glow flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
            P
          </div>
          <span className="font-bold text-xl tracking-tight">PixVideo</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-elevated">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">欢迎回来</h1>
            <p className="text-sm text-slate-500 mt-1">
              登录后继续你的 AI 素材创作
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setUser({ name: "Lisa", email: "lisa@pixvideo.io", plan: "pro", avatar: "L" });
                setLoading(false);
                toast.success("已通过 Google 登录");
                router.push("/dashboard");
              }, 600);
            }}
          >
            <Chrome className="w-4 h-4" />
            使用 Google 账号登录
          </Button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">或</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  登录中...
                </>
              ) : (
                <>
                  登录
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700">
            <strong>Demo 提示</strong>：任何邮箱 + 任意密码都能登录，默认进入 Pro 套餐账号
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            还没有账号？
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            >
              免费注册
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          登录即表示同意
          <Link href="#" className="underline mx-1">服务条款</Link>
          和
          <Link href="#" className="underline mx-1">隐私政策</Link>
        </p>
      </motion.div>
    </div>
  );
}
