import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

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
        <body className={`${poppins.className} min-h-screen bg-gradient-to-b from-blue-100 to-white`}>
        <header className="bg-olympic-blue text-white py-4">
            <nav className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-2xl font-bold">Olympic Body Explorer</div>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-olympic-yellow transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-olympic-yellow transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-olympic-yellow transition-colors">Contact</a></li>
                </ul>
            </nav>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-olympic-blue text-white py-4 mt-8">
            <div className="container mx-auto px-4 text-center">
                &copy; 2024 Olympic Body Explorer. All rights reserved.
            </div>
        </footer>
        </body>
        </html>
    );
}