import './globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ClientWrapper from '@/lib/components/ClientWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s - Texas Sports Academy',
    default: 'Texas Sports Academy Platform',
  },
  description: 'Texas Sports Academy - Empowering young athletes through education and sports',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }
        >
          <ClientWrapper>{children}</ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
