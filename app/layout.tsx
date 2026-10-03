import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=JetBrains+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#060504] text-[#f5efe6] font-sans antialiased overflow-x-hidden selection:bg-[#e8a830]/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
