"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { GiBiohazard } from "react-icons/gi";
import styles from "./styles/HardDeleteBtn.module.css";

export default function HardDeleteBtn() {
  const [panelVisibility, setPanelVisibility] = useState(false);

  async function deleteAccount() {
    const res = await fetch("/api/users/hard-delete", {
      method: "DELETE",
    });

    if (res.ok) {
      signOut({ redirectTo: "/login" });
    }
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => setPanelVisibility(true)}
        className={styles.deleteBtn}
      >
        <GiBiohazard />
      </button>
      {panelVisibility && (
        <div className={styles.panel}>
          <button className={styles.yesBtn} onClick={deleteAccount}>
            Si
          </button>
          <button
            className={styles.noBtn}
            onClick={() => setPanelVisibility(false)}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
