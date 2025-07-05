import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import { OrderNotificationProvider } from './context/OrderNotificationContext';
import Navbar from "./components/Navbar";
import SocketProvider from "./components/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foods",
  description: "Foods App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <OrderNotificationProvider>
          <SocketProvider>
            <Navbar />
            <main>
              {children}
            </main>
          </SocketProvider>
        </OrderNotificationProvider>
      </body>
    </html>
  );
}
