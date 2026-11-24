import { Inter, Geist_Mono } from "next/font/google";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
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
		<html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
			<body>
				<Navbar sticky="top" className="app-navbar py-3">
					<Container className="gap-3">
						<NavbarBrand href="/">
							Route Snipper<span className="brand-dot">.</span>
						</NavbarBrand>
						<Nav className="ms-auto gap-1">
							<NavLink href="/">Shorten</NavLink>
							<NavLink href="/links">All links</NavLink>
						</Nav>
					</Container>
				</Navbar>

				<main className="page-main">
					<Container>{children}</Container>
				</main>

				<footer className="app-footer">
					<Container>
						Route Snipper<span className="brand-dot">.</span> Built with
						Next.js and React Bootstrap
					</Container>
				</footer>
			</body>
		</html>
	);
}
