import "./globals.css";
import type { Metadata } from "next";
import { Inter, PT_Sans_Narrow, Overpass } from "next/font/google";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["500", "600", "800"],
});

const pt_Sans_Narrow = PT_Sans_Narrow({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Finance-Manager",
  description:
    "Take control of your finances with our intuitive personal financial management web application. Manage your income, expenses and savings efficiently. Get detailed analysis, set financial goals and plan for a solid financial future. Sign up today and start building your path to financial freedom!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + overpass.className + pt_Sans_Narrow.className
        }
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
