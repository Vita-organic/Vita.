import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VITAMINAS — A Química da Vida | Experiência Molecular Editorial",
  description:
    "Uma experiência editorial científica sobre a bioquímica das vitaminas, estrutura molecular 3D e fisiologia humana.",
  keywords: ["vitaminas", "química", "bioquímica", "molécula 3D", "lipossolúveis", "hidrossolúveis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${cormorantGaramond.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#060504] text-[#f5efe6] font-sans antialiased overflow-x-hidden selection:bg-[#e8a830]/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
