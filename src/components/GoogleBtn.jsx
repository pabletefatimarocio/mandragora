"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import styles from "./styles/GoogleBtn.module.css";

export default function GoogleBtn() {
  return (
    <button onClick={() => signIn("google")} className={styles.googleBtn}>
      <FcGoogle fontSize="30px" />
      Google
    </button>
  );
}
