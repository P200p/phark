import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BergDotBet B.B. - Sharkcial แพลตฟอร์มโซเชียลยุคใหม่',
  description: 'แพลตฟอร์มโซเชียลมีเดียที่ผสมผสานระบบเครดิต การกู้ยืม P2P และ marketplace ในตัว',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="font-inter">{children}</body>
    </html>
  );
}