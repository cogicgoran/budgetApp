import React, { ReactNode } from "react";
import styles from "./mainCard.module.scss";

interface Props {
  children: ReactNode;
}

function MainCard({ children }: Props) {
  return <div className={styles["main-card"]}>{children}</div>;
}

export default MainCard;
