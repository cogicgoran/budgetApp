import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./userLoggedDisplay.module.css";
import { getAuth } from "firebase/auth";

const UserOptionDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  const textLogout = t("logout");

  async function handleLogout() {
    try {
      await getAuth(getFirebaseClient()).signOut();
    } catch (error) {
      alert("error while logging out");
    }
  }

  function handleDropdownClick(event: any) {
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
      <div className={styles["display-user-logged"]}>
        <div onClick={handleDropdownClick}>
          {/* <FontAwesomeIcon
            className={styles["display-user-icon"]}
            icon={solid("circle-user")}
          /> */}
          {/* <FontAwesomeIcon
            className={styles["display-user-arrow"]}
            icon={solid("chevron-down")}
          /> */}
        </div>
        {showDropdown && (
          <div className={styles["display-user-dropdown"]}>
            <div onClick={handleLogout}>{textLogout}</div>
          </div>
        )}
      </div>
      {showDropdown && (
        <div
          className={styles["dropdown-bg"]}
          onClick={handleDropdownClick}
        ></div>
      )}
    </div>
  );
};

export default UserOptionDropdown;
