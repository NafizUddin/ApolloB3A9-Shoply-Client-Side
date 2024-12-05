import Footer from "@/src/components/HomeComponents/Footer/Footer";
import Navbar from "@/src/components/shared/navbar/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
