/**
 * 全局数据 store
 * - 用 zustand + persist (localStorage) 跨页面保持状态
 * - 用户生成的图/视频都存在这里
 * - 历史记录、套餐统计、Dashboard 都从这里读
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "@/lib/utils";

export type AssetType = "image" | "video";
export type ImageMode = "background" | "scene" | "model" | "batch";
export type VideoTemplate = "ugc" | "demo" | "unbox" | "pain" | "compare";

export interface Asset {
  id: string;
  type: AssetType;
  name: string;
  thumbnail: string;
  url?: string;
  count: number;
  mode?: ImageMode | string;
  template?: VideoTemplate | string;
  cost: number;
  createdAt: number; // timestamp
  duration?: string;
  status: "done" | "processing" | "error";
}

interface AppState {
  // 上传的产品图（跨页面共享）
  uploadedProductImage: string | null;
  setUploadedProductImage: (image: string | null) => void;

  // 生成的素材
  assets: Asset[];
  addAsset: (asset: Omit<Asset, "id" | "createdAt">) => string;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  removeAsset: (id: string) => void;
  clearAssets: () => void;

  // 当月用量
  usageThisMonth: {
    images: number;
    videos: number;
    cost: number;
  };
  incrementUsage: (type: AssetType, count: number, cost: number) => void;

  // 用户信息（mock）
  user: {
    name: string;
    email: string;
    plan: "free" | "starter" | "pro" | "enterprise";
    avatar: string;
  } | null;
  setUser: (user: AppState["user"]) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      uploadedProductImage: null,
      setUploadedProductImage: (image) => set({ uploadedProductImage: image }),

      assets: [],
      addAsset: (asset) => {
        const id = generateId();
        const newAsset: Asset = {
          ...asset,
          id,
          createdAt: Date.now(),
        };
        set((state) => ({ assets: [newAsset, ...state.assets] }));
        return id;
      },
      updateAsset: (id, updates) =>
        set((state) => ({
          assets: state.assets.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),
      removeAsset: (id) =>
        set((state) => ({ assets: state.assets.filter((a) => a.id !== id) })),
      clearAssets: () => set({ assets: [] }),

      usageThisMonth: { images: 0, videos: 0, cost: 0 },
      incrementUsage: (type, count, cost) =>
        set((state) => ({
          usageThisMonth: {
            images: state.usageThisMonth.images + (type === "image" ? count : 0),
            videos: state.usageThisMonth.videos + (type === "video" ? count : 0),
            cost: state.usageThisMonth.cost + cost,
          },
        })),

      user: {
        name: "Lisa",
        email: "lisa@pixvideo.io",
        plan: "pro",
        avatar: "L",
      },
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "pixvideo-storage",
      partialize: (state) => ({
        uploadedProductImage: state.uploadedProductImage,
        assets: state.assets,
        usageThisMonth: state.usageThisMonth,
        user: state.user,
      }),
    }
  )
);

// 辅助函数：格式化时间
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days === 1) return "昨天";
  if (days < 7) return `${days} 天前`;
  return new Date(timestamp).toLocaleDateString("zh-CN");
}
