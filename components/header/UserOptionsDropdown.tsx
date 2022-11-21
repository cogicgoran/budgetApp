import React, { MouseEvent, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { firebaseAuthService } from "../../config/firebase/service";
import { IconChevronDown } from "../icons/ChevronDown";
import { IconCircleUser } from "../icons/CircleUser";
import styles from "./userLoggedDisplay.module.scss";

const UserOptionDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();
  const [signOut, loading, error] = useSignOut(firebaseAuthService);

  const textLogout = t("logout");

  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      alert("Sign out error occurred");
    }
  }

  function handleDropdownClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setShowDropdown((prevState) => !prevState);
  }

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.displayUserLogged}>
        <div className={styles.userDropdownLabel} onClick={handleDropdownClick}>
          <IconCircleUser key="userIcon" />
          <IconChevronDown key="arrowDown" />
        </div>
        {showDropdown && (
          <div className={styles.displayUserDropdown}>
            <div onClick={handleLogout}>{textLogout}</div>
          </div>
        )}
      </div>
      {showDropdown && (
        <div
          className={styles.dropdownBackground}
          onClick={handleDropdownClick}
        ></div>
      )}
    </div>
  );
};

export default UserOptionDropdown;
