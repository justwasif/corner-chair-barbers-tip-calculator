import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Corner Chair Barbers — Tip Calculator',
  description: 'Quick, clean tip calculator for the chair.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F7F4EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-start justify-center px-4 py-6 sm:items-center sm:py-10">
        {children}
      </body>
    </html>
  );
}
