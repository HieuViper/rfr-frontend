import Footer from "../Footer";
import Header from "../Header";
import { Toaster } from "../ui/toaster";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-72px-80px)] mx-auto">{children}</main>
      <Footer />
      <Toaster />
    </>
  );
};

export default MainLayout;
