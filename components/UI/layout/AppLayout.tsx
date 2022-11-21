import { ReactNode } from "react";
import styles from "./appLayout.module.scss";

function AppLayout({ children }: { children: ReactNode }) {
  return <div className={styles.appContainer}>{children}</div>;
}

export default AppLayout;
