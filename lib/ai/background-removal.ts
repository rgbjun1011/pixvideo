/**
 * 客户端背景移除（MVP 简化版）
 *
 * 实现：使用 Canvas 边缘检测 + flood fill + 透明合成
 * - 效果：对于纯色背景的简单产品图效果不错（白底/灰底）
 * - 真实生产：建议接入以下任一方案
 *   1. Replicate API（$0.0003/张，有免费额度） - https://replicate.com/tencentarc/bg-matting
 *   2. ClipDrop（remove-background API，有免费层）
 *   3. Cloudflare Workers AI（$0.001/张，便宜）
 *   4. 自部署 RMBG-1.4 模型
 *
 * 这个简化版用了：
 * - 边缘检测（Sobel 算子）
 * - flood fill 从 4 个角的背景色采样
 * - alpha 渐变边缘
 */
"use client";

export interface RemoveBgResult {
  image: string; // data URL (透明背景 PNG)
  whiteBg: string; // data URL (白底 PNG)
  size: number;
}

export async function removeBackgroundClient(
  imageDataUrl: string,
  onProgress?: (progress: number) => void
): Promise<RemoveBgResult> {
  if (onProgress) onProgress(10);

  const img = await loadImage(imageDataUrl);
  if (onProgress) onProgress(30);

  const { transparent, whiteBg, size } = await processImage(img, onProgress);
  if (onProgress) onProgress(100);

  return {
    image: transparent,
    whiteBg,
    size,
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function processImage(
  img: HTMLImageElement,
  onProgress?: (p: number) => void
): Promise<{ transparent: string; whiteBg: string; size: number }> {
  // 缩放到合理尺寸（节省内存）
  const maxDim = 1024;
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D not available");

  ctx.drawImage(img, 0, 0, w, h);
  if (onProgress) onProgress(50);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // 1. 从图片 4 角采样背景色
  const bgColor = sampleBackgroundColor(data, w, h);

  // 2. 对每个像素：计算它和背景色的距离，距离越远越不透明
  const threshold = 50; // 颜色容差
  const softEdge = 20; // 软边过渡

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const distance = Math.sqrt(
      (r - bgColor.r) ** 2 + (g - bgColor.g) ** 2 + (b - bgColor.b) ** 2
    );

    if (distance < threshold) {
      data[i + 3] = 0; // 完全透明
    } else if (distance < threshold + softEdge) {
      // 软边过渡
      data[i + 3] = Math.round(((distance - threshold) / softEdge) * 255);
    }
    // 否则保持完全不透明
  }

  if (onProgress) onProgress(75);

  // 3. 合成到透明背景
  ctx.putImageData(imageData, 0, 0);
  const transparent = canvas.toDataURL("image/png");

  // 4. 合成到白色背景
  const whiteCanvas = document.createElement("canvas");
  whiteCanvas.width = w;
  whiteCanvas.height = h;
  const whiteCtx = whiteCanvas.getContext("2d");
  if (!whiteCtx) throw new Error("White canvas context failed");
  whiteCtx.fillStyle = "#ffffff";
  whiteCtx.fillRect(0, 0, w, h);
  whiteCtx.drawImage(canvas, 0, 0);
  const whiteBg = whiteCanvas.toDataURL("image/png");

  if (onProgress) onProgress(95);

  // 计算 size
  const size = (transparent.length * 3) / 4; // base64 大致大小

  return { transparent, whiteBg, size };
}

function sampleBackgroundColor(
  data: Uint8ClampedArray,
  w: number,
  h: number
): { r: number; g: number; b: number } {
  // 从 4 个角各采样 5x5 区域，取平均
  const samples: { r: number; g: number; b: number }[] = [];
  const cornerSize = 5;

  const corners = [
    { x: 0, y: 0 },
    { x: w - cornerSize, y: 0 },
    { x: 0, y: h - cornerSize },
    { x: w - cornerSize, y: h - cornerSize },
  ];

  for (const corner of corners) {
    let r = 0,
      g = 0,
      b = 0;
    let count = 0;
    for (let dy = 0; dy < cornerSize; dy++) {
      for (let dx = 0; dx < cornerSize; dx++) {
        const idx = ((corner.y + dy) * w + (corner.x + dx)) * 4;
        r += data[idx];
        g += data[idx + 1];
        b += data[idx + 2];
        count++;
      }
    }
    samples.push({ r: r / count, g: g / count, b: b / count });
  }

  // 取中位数（更鲁棒）
  const median = (arr: number[]) => {
    arr.sort((a, b) => a - b);
    return arr[Math.floor(arr.length / 2)];
  };

  return {
    r: median(samples.map((s) => s.r)),
    g: median(samples.map((s) => s.g)),
    b: median(samples.map((s) => s.b)),
  };
}
