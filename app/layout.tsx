import { Metadata } from 'next';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';


export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'NextJS Dashboard website - Made By M Suleman.',
  metadataBase: new URL('https://nextjs-dashboard-by-msuleman.vercel.app/'),
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}