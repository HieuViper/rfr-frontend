import MainLayout from "@/components/layouts/MainLayout";
import { Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "RFR - Room For Rent",
  description: "Tìm phòng trọ và nhà trọ online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <NextTopLoader color="#e11d48" />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
