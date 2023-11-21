import { ReactNode } from "react";
import AnimatedBackground from "./background";
import PageTransition from "@/components/global/page.transition";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <section className="flex">
      <div className="md:w-1/2 h-screen sticky bg-black inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>
      <div className="flex-auto md:p-20 sm:p-10 p-5 flex items-center min-h-screen overflow-auto">
        <PageTransition>{children}</PageTransition>
      </div>
    </section>
  );
};

export default Layout;
