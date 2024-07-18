import GlobalHeader from '@/app/_components/global-header';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';
import cn from 'classnames';
import type { Metadata } from 'next';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';

import './globals.css';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'Duchi.',
  description: `Duchi's blog. 개발 관련 글을 읽을 수 있어요`,
  openGraph: {
    title: 'Duchi.',
    type: 'website',
    url: process.env.BASE_URL || 'http://localhost:3000',
    siteName: 'Duchi.',
    locale: 'ko_KR',
    description: `Duchi's blog. 개발 관련 글을 읽을 수 있어요`,
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        alt: 'Duchi blog thumbnail',
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ['김두창', 'Duchi', '개발자', '프론트엔드'],
  authors: [
    {
      name: 'Duchi',
      url: process.env.BASE_URL || 'http://localhost:3000',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(
          inter.className,
          'dark:bg-zinc-900 dark:text-zinc-300',
          'flex min-h-screen flex-col',
        )}
      >
        <GlobalHeader />
        <div className="mt-[69px]">{children}</div>
      </body>
    </html>
  );
}
