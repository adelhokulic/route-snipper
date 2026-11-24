import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Route Snipper",
	description: "Link shortener",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>
				<header className="header">
					<a href="/" className="logo">
						✂️ Route Snipper
					</a>
					<nav className="nav">
						<a href="/">Shorten</a>
						<a href="/links">All links</a>
					</nav>
				</header>

				<main className="container">{children}</main>
			</body>
		</html>
	);
}
