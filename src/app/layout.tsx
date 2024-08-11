import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Olympic Body Type Explorer',
  description: 'Discover which Olympic sports match your body type',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-100`}>
      <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
      </html>
  );
}