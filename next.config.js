/** @type {import('next').NextConfig} */
const isCapacitorBuild = process.env.CAPACITOR_BUILD === 'true'

const nextConfig = isCapacitorBuild
  ? {
      output: 'export',       // 정적 파일로 빌드 (Capacitor용)
      images: { unoptimized: true }, // next/image 최적화는 서버가 필요해서 끔
    }
  : {} // Vercel 배포용은 기존 그대로 (API route 정상 작동)

module.exports = nextConfig
