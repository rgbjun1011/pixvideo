/**
 * 客户端直接调 Pollinations.ai 免费图片生成 API
 * - 无需 API key
 * - 支持 CORS
 * - 文档：https://pollinations.ai/
 *
 * 注意：实际生产应该走 server proxy（加缓存、配额、计费）
 */
"use client";

export async function generateImagesViaPollinations(
  prompt: string,
  n: number = 3,
  options: { width?: number; height?: number } = {}
): Promise<string[]> {
  const { width = 1024, height = 1024 } = options;
  const count = Math.min(n, 4);

  const promises = Array.from({ length: count }).map(async (_, i) => {
    const seed = Math.floor(Math.random() * 1000000) + i * 1000;
    const encodedPrompt = encodeURIComponent(prompt);
    // 不带 nologo，避免水印；model 选 flux（免费）
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) throw new Error(`Pollinations 返回 ${res.status}`);
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error(`生成第 ${i + 1} 张失败:`, err);
      // 失败 fallback 到 picsum
      return `https://picsum.photos/seed/${seed}/${width}/${height}`;
    }
  });

  return Promise.all(promises);
}
