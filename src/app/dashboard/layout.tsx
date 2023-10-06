import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
