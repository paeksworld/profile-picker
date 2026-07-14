import './globals.css'
import RegisterSW from './register-sw'

export const metadata = {
  title: '소개팅 프로필 사진 고르기',
  description: '남사친 AI가 베스트 프로필 사진 골라줌',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '프사고르기',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  themeColor: '#FF6B9D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  )
}
