"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Lock, CreditCard, Trash2, Save } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export default function SettingsPage() {
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("姓名和邮箱不能为空");
      return;
    }
    setUser({
      name,
      email,
      plan: user?.plan || "pro",
      avatar: name[0]?.toUpperCase() || "U",
    });
    toast.success("设置已保存");
  };

  return (
    <>
      <Topbar title="设置" subtitle="管理你的账号、通知和安全" />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Profile */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">个人资料</h3>
                <p className="text-xs text-slate-500">更新你的姓名和邮箱</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                  姓名
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                  邮箱
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="primary">Pro 套餐</Badge>
              <span className="text-xs text-slate-500">下次扣款 2026-07-01</span>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4" />
                保存
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                <Bell className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">通知</h3>
                <p className="text-xs text-slate-500">选择你想收到的通知类型</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { id: "email_complete", label: "生成完成时邮件通知", default: true },
                { id: "email_weekly", label: "每周用量总结", default: true },
                { id: "email_tips", label: "产品更新和技巧", default: false },
              ].map((n) => (
                <label
                  key={n.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-sm text-slate-700">{n.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={n.default}
                    className="w-4 h-4 accent-blue-600"
                  />
                </label>
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Lock className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">安全</h3>
                <p className="text-xs text-slate-500">密码和登录</p>
              </div>
            </div>
            <Button variant="outline">修改密码</Button>
            <Button variant="outline" className="ml-2">
              开启两步验证
            </Button>
          </Card>

          {/* Billing link */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">订阅与付款</h3>
                <p className="text-xs text-slate-500">管理你的订阅和发票</p>
              </div>
            </div>
            <a href="/billing">
              <Button variant="outline">前往套餐与账单</Button>
            </a>
          </Card>

          {/* Danger zone */}
          <Card className="p-6 border-red-200 bg-red-50/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900">危险操作</h3>
                <p className="text-xs text-red-700">不可恢复的操作</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => alert("Demo 账号不支持删除")}
            >
              删除账号
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
