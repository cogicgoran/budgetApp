import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";
import UserOptionDropdown from "./UserOptionsDropdown";

const Header = () => {
  return (
    <Link href="/dashboard">
      <header className={styles.header}>
        <h1 className={styles["header__title"]}>AragoK Budget App</h1>
        {/* {!!user && <UserOptionDropdown />} */}
      </header>
    </Link>
  );
};

export default Header;
