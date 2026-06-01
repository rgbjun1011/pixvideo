/**
 * 头像系统
 * - 用 Pravatar 真实人脸图（70 个不同真人）
 * - 通过 seed 字符串生成稳定的 hash → 同一个名字永远是同一张脸
 * - 优先女性/男性/特定 image id，对应 Lisa/Mike/Sara 三类人
 */

const FEMALE_AVATARS = [5, 9, 10, 16, 23, 26, 29, 31, 32, 33, 38, 45, 47, 48, 49];
const MALE_AVATARS = [3, 7, 8, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 33, 60];

// 3 个核心角色用固定头像（保证 demo 稳定）
export const AVATAR_PRESETS = {
  lisa: "https://i.pravatar.cc/300?img=47", // 30+ 亚洲女性（卖家）
  mike: "https://i.pravatar.cc/300?img=33", // 30+ 亚洲男性（铺货型）
  sara: "https://i.pravatar.cc/300?img=44", // 40+ 成熟女性（代运营）
  linda: "https://i.pravatar.cc/300?img=23", // 备用
  john: "https://i.pravatar.cc/300?img=12", // 备用
  alex: "https://i.pravatar.cc/300?img=68", // 备用
};

/**
 * 根据 seed（用户名/邮箱/ID）生成稳定的头像 URL
 * 同一种子永远返回同一张图
 */
export function getAvatarUrl(seed: string, gender?: "female" | "male"): string {
  // 查预设
  const preset = AVATAR_PRESETS[seed.toLowerCase() as keyof typeof AVATAR_PRESETS];
  if (preset) return preset;

  // hash
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0x7fffffff;
  }

  // 根据 hash 选 ID + 性别
  const pool =
    gender === "female"
      ? FEMALE_AVATARS
      : gender === "male"
        ? MALE_AVATARS
        : hash % 2 === 0
          ? FEMALE_AVATARS
          : MALE_AVATARS;

  const idx = hash % pool.length;
  const imgId = pool[idx];
  return `https://i.pravatar.cc/300?img=${imgId}`;
}

// 头像尺寸辅助
export function avatarSize(url: string, size: number): string {
  return url.replace("/300?", `/${size}?`);
}
