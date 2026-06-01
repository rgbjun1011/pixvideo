import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * 使用 Pollinations.ai 免费图片生成 API
 * 无需 API key，但有 rate limit
 * 文档：https://pollinations.ai/
 */
export async function POST(req: NextRequest) {
  try {
    const { prompt, n = 3, width = 1024, height = 1024 } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "缺少 prompt" }, { status: 400 });
    }

    const count = Math.min(n, 4); // 最多 4 张
    const images: string[] = [];

    // 并发生成多张
    const promises = Array.from({ length: count }).map(async (_, i) => {
      // 用不同的 seed 生成不同变体
      const seed = Math.floor(Math.random() * 1000000) + i * 1000;
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

      try {
        const res = await fetch(url, {
          // 30s timeout
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) throw new Error(`Pollinations 返回 ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        return `data:image/jpeg;base64,${buffer.toString("base64")}`;
      } catch (err) {
        console.error(`生成第 ${i + 1} 张失败:`, err);
        // 失败时返回 picsum 占位图
        return `https://picsum.photos/seed/${seed}/${width}/${height}`;
      }
    });

    const results = await Promise.all(promises);
    images.push(...results);

    return NextResponse.json({
      success: true,
      images,
      prompt,
      count: images.length,
    });
  } catch (err: any) {
    console.error("图片生成失败:", err);
    return NextResponse.json(
      { error: err.message || "生成失败" },
      { status: 500 }
    );
  }
}
