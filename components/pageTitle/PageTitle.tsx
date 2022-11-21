import React from "react";
import styles from "./pageTitle.module.scss";

interface Props {
  title: string;
}

function PageTitle({ title }: Props) {
  return (
    <div className={styles["page-title"]}>
      <h1>{title}</h1>
    </div>
  );
}

export default PageTitle;
