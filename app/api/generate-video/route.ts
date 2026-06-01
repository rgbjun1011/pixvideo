import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * 视频生成 API（MVP版本）
 *
 * 真实生产环境应该接：
 * - Replicate (stability-ai/stable-video-diffusion 等)
 * - 或火山引擎 Seedance 2.0
 * - 或 Kling API
 *
 * MVP 阶段：先 mock 异步流程，验证产品逻辑
 * 后续切换：替换 generateVideo 函数即可，前端无需改动
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { template, language, productImage, prompt } = body;

    // 生成任务 ID
    const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // 真实实现：
    // 1. 把任务扔到队列（BullMQ / Inngest / Trigger.dev）
    // 2. worker 调用 Replicate/Seedance API
    // 3. 完成后回调通知前端
    // 4. 前端轮询 /status/[id] 拿到结果

    // MVP 版本：直接返回任务 ID，前端用 mock 进度演示流程
    return NextResponse.json({
      success: true,
      jobId,
      estimatedTime: 60, // 秒
      status: "queued",
      message: "任务已提交，初始化后开始处理",
    });
  } catch (err: any) {
    console.error("视频生成任务创建失败:", err);
    return NextResponse.json(
      { error: err.message || "提交失败" },
      { status: 500 }
    );
  }
}
