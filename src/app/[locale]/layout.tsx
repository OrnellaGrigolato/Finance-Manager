import "./globals.css";
import type { Metadata } from "next";
import { Inter, PT_Sans_Narrow, Overpass } from "next/font/google";
import { Providers } from "./providers/Providers";
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';


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


type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
 };
 
 export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../../messages/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <body className={inter.className + overpass.className + pt_Sans_Narrow.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
 }
 
