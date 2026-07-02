import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness Corner Gym | Premium Gym Management",
  description: "Experience the luxury gym management system. Member portal, coach panel, and owner dashboard.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fitness Corner"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-950 text-neutral-100 flex justify-center items-start min-h-screen overflow-y-auto">
        {/* Mobile Viewport Simulation Frame */}
        <div className="w-full max-w-[480px] min-h-screen bg-bg-primary text-text-primary flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.85)] border-x border-neutral-900/50">
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
