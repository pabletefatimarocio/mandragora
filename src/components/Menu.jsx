"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";
import SignoutBtn from "./SignoutBtn";
import styles from "./styles/Menu.module.css";

export default function Menu() {
  const pathname = usePathname();

  return (
    <div
      className={`${styles.containerMenu} ${
        pathname === "/home" ? styles.homeVariant : undefined
      }`}
    >
      <div className={styles.hamburguer}>
        <RxHamburgerMenu />
      </div>

      <SignoutBtn />
    </div>
  );
}
