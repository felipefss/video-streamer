import '@radix-ui/themes/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Theme } from '@radix-ui/themes';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Video Streamer',
  description: 'Streaming player for my portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <Theme appearance="dark">{children}</Theme>
      </body>
    </html>
  );
}
