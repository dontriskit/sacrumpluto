import "@/styles/globals.css";

import type { Metadata } from "next";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
	title: "Igor `Sacrumpluto` — pro kiteboarding",
	description:
		"Kiteboarder z Półwyspu Helskiego — Chałupy, Malayka, kitesafari.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
	subsets: ["latin", "latin-ext"],
	variable: "--font-inter",
});

const display = Big_Shoulders({
	subsets: ["latin", "latin-ext"],
	weight: ["500", "700", "800", "900"],
	variable: "--font-display",
});

const jbMono = JetBrains_Mono({
	subsets: ["latin", "latin-ext"],
	variable: "--font-jbmono",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={`${inter.variable} ${display.variable} ${jbMono.variable}`}
			lang="pl"
		>
			<body>{children}</body>
		</html>
	);
}
