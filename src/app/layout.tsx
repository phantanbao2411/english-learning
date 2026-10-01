import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Học Tiếng Anh 1vs1",
  description: "Web app học tiếng Anh cá nhân chuẩn giáo trình và quản lý giờ học với giáo viên",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Học Tiếng Anh",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex justify-center">
        {/* Mobile constrained container with responsive tablet/desktop max-width */}
        <div className="w-full max-w-md min-h-screen flex flex-col bg-white shadow-sm relative">
          {children}
        </div>
      </body>
    </html>
  );
}
