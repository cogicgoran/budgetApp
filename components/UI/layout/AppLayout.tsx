import { ReactNode } from "react";
import classNames from "classnames";

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={classNames(
        "w-[100vw] h-[100vh] bg-[#e0f9ff] border-solid border-2 border-[#90c3d0] max-w-4xl m-auto"
      )}
    >
      {children}
    </div>
  );
}

export default AppLayout;
