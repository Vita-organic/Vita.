import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VITAMINAS — A Química da Vida | Experiência Molecular Interativa",
  description:
    "Uma experiência editorial e molecular imersiva sobre a química das vitaminas e sua importância biológica fundamental.",
  keywords: ["vitaminas", "química", "vitamina c", "ácido ascórbico", "bioquímica", "molécula 3D"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#070605] text-[#f4efe8] font-sans antialiased overflow-x-hidden selection:bg-[#c9944d]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
