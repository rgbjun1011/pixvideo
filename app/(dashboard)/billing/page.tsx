"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Download, Sparkles, Star, Zap } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 39,
    desc: "适合个人卖家",
    features: [
      "100 张商品图",
      "20 条视频/月",
      "基础模板",
      "3 平台适配",
      "邮件支持",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    desc: "适合中小卖家",
    popular: true,
    features: [
      "500 张商品图",
      "100 条视频/月",
      "场景图 + 模特图 + 数字人",
      "爆款复刻引擎",
      "品牌风格库",
      "6 平台全尺寸",
      "批量处理",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    desc: "团队 / 代运营",
    features: [
      "2000 张商品图",
      "500 条视频/月",
      "所有 Pro 功能",
      "API 接入",
      "无限品牌库",
      "优先队列",
      "专属客服",
    ],
  },
];

const invoices = [
  {
    id: "INV-2026-0501",
    date: "2026-05-01",
    amount: "$79.00",
    subtotal: "$72.48",
    tax: "$6.52",
    status: "paid",
    statusText: "已付",
    plan: "Pro 月度",
    card: "Visa •••• 4242",
    period: "2026-05-01 ~ 2026-05-31",
  },
  {
    id: "INV-2026-0401",
    date: "2026-04-01",
    amount: "$79.00",
    subtotal: "$72.48",
    tax: "$6.52",
    status: "paid",
    statusText: "已付",
    plan: "Pro 月度",
    card: "Visa •••• 4242",
    period: "2026-04-01 ~ 2026-04-30",
  },
  {
    id: "INV-2026-0301",
    date: "2026-03-01",
    amount: "$79.00",
    subtotal: "$72.48",
    tax: "$6.52",
    status: "paid",
    statusText: "已付",
    plan: "Pro 月度",
    card: "Visa •••• 4242",
    period: "2026-03-01 ~ 2026-03-31",
  },
];

export default function BillingPage() {
  return (
    <>
      <Topbar title="套餐与账单" subtitle="管理你的订阅、付款方式和发票" />
      <div className="p-6 max-w-6xl mx-auto">
        {/* Current Plan */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-blue-600 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Star className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-blue-100">当前套餐</div>
              <div className="text-3xl font-bold mt-1">Pro</div>
              <div className="text-sm text-blue-100 mt-1">$79/月 · 下次扣款 2026-06-01</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                取消订阅
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                升级套餐
              </Button>
            </div>
          </div>
        </Card>

        {/* Usage This Month */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "已用图片", used: 128, total: 500, color: "from-blue-500 to-cyan-500" },
            { label: "已用视频", used: 23, total: 100, color: "from-purple-500 to-pink-500" },
            { label: "本月成本", used: 24.18, total: 50, prefix: "$" },
          ].map((s) => {
            const pct = s.total > 0 ? (s.used / s.total) * 100 : 0;
            return (
              <Card key={s.label} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">{s.label}</span>
                  <span className="text-sm text-slate-500">
                    {s.prefix || ""}
                    {s.used}
                    {s.prefix ? "" : " / "}
                    {!s.prefix && s.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${s.color || "from-blue-500 to-cyan-500"}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {pct.toFixed(1)}% 已使用
                </div>
              </Card>
            );
          })}
        </div>

        {/* Plans */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">切换套餐</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((p) => (
            <Card
              key={p.id}
              className={`p-6 relative ${p.popular ? "border-2 border-blue-500" : ""}`}
            >
              {p.popular && (
                <Badge variant="gradient" size="sm" className="absolute -top-2 left-1/2 -translate-x-1/2">
                  推荐
                </Badge>
              )}
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {p.name}
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold text-slate-900">${p.price}</span>
                <span className="text-slate-500 ml-1">/月</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{p.desc}</p>
              <Button
                className="w-full mt-5"
                variant={p.popular ? "primary" : "outline"}
              >
                {p.id === "pro" ? "当前套餐" : `切换到 ${p.name}`}
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">付款方式</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900">Visa •••• 4242</div>
              <div className="text-xs text-slate-500">有效期 12/2027</div>
            </div>
            <Button variant="outline" size="sm">
              更新
            </Button>
          </div>
        </Card>

        {/* Billing Info */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">账单信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                账单接收方
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-slate-900">WaveAudio 跨境电商有限公司</div>
                <div className="text-slate-600">Lisa Wang</div>
                <div className="text-slate-600">lisa@waveaudio.com</div>
                <div className="text-slate-500 text-xs mt-1">
                  广东省深圳市南山区科技园南区 12 号楼 9 楼
                </div>
                <div className="text-slate-500 text-xs">VAT ID: CN 91440300MA5F8X9P</div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 h-7 text-xs">
                更新账单信息
              </Button>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                税务信息
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">税率</span>
                  <span className="text-slate-900 font-mono">9% VAT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">币种</span>
                  <span className="text-slate-900 font-mono">USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">下次扣款</span>
                  <span className="text-slate-900">2026-07-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">下次扣款金额</span>
                  <span className="text-slate-900 font-mono">$79.00</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Invoices */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">历史发票</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                含 Stripe 自动开具的 PDF · 永久可下载
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="w-3.5 h-3.5" />
              全部下载
            </Button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">发票号</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">期间</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">小计</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">税</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">总额</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs uppercase">状态</th>
                <th className="text-right py-2 font-semibold text-slate-500 text-xs uppercase">操作</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                >
                  <td className="py-3">
                    <div className="font-mono text-xs text-slate-900">{inv.id}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{inv.date}</div>
                  </td>
                  <td className="py-3 text-xs text-slate-600 font-mono">{inv.period}</td>
                  <td className="py-3 font-mono text-slate-700 text-xs">{inv.subtotal}</td>
                  <td className="py-3 font-mono text-slate-500 text-xs">{inv.tax}</td>
                  <td className="py-3 font-mono text-slate-900 font-semibold">
                    {inv.amount}
                  </td>
                  <td className="py-3">
                    <Badge variant="success" size="sm">
                      <Check className="w-2.5 h-2.5" />
                      {inv.statusText}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Download className="w-3 h-3" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
