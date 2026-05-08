import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Países del Mundo",
  description: "Práctica 2 - Frontend",
};

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="es">
    <body>{children}</body>
  </html>
);
