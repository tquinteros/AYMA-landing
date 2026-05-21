import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <GoogleTagManager gtmId="GTM-P8VCJWDJ" />
    </>
  );
}
