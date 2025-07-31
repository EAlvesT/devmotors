import type { Metadata } from "next";
import "./globals.scss";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "DevMotors - Sua oficina especializada!",
  description: "Oficina de carros em São Paulo",
  keywords: ["oficina", "oficina de carros", "carros", "manutenção de carros"],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.jpg`],
    title: "DevMotors - Sua oficina especializada!"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body>
        <Header/>
        {children}
        <p style={{ textAlign: "center", marginTop: 54, marginBottom: 24 }}>
          Todos os direitos reservados @ {`${new Date().getFullYear()}`}
        </p>
      </body>
    </html>
  );
}