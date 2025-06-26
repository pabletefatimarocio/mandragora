"use client";

import { FaPowerOff } from "react-icons/fa";
import { signOut } from "next-auth/react";
import styles from "./styles/SignoutBtn.module.css";

export default function SignoutBtn() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/login" })}
      className={styles.container}
    >
      <FaPowerOff />
    </button>
  );
}
