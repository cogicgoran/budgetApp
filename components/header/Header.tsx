import React from "react";
import Link from "next/link";
import UserOptionDropdown from "./UserOptionsDropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../../config/firebase/service";
import styles from "./header.module.scss";

const Header = () => {
  const [user] = useAuthState(firebaseAuthService);

  return (
    <Link href="/dashboard">
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>AragoK Budget App</h1>
        {!!user && <UserOptionDropdown />}
      </header>
    </Link>
  );
};

export default Header;
