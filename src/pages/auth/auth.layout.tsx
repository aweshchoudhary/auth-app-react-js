import { ReactNode } from "react";
import AnimatedBackground from "./background";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <section className="lg:flex">
      <div className="lg:w-1/2 lg:h-screen lg:sticky bg-black inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>
      <div className="flex-auto lg:p-20 sm:p-10 p-5 flex items-center min-h-screen overflow-auto">
        {children}
      </div>
    </section>
  );
};

export default Layout;
