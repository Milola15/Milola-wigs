import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { PanierProvider } from "./components/PanierContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata = {
  title: "Milola Wigs",
  description: "Des Perruques choisis avec soin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}>
        <PanierProvider>
          {children}
        </PanierProvider>
      </body>
    </html>
  );
}