"use client";

import styles from "./styles/Menu.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  return (
    <div
      className={`${styles.containerMenu} ${
        pathname === "/home" ? styles.homeVariant : undefined
      }`}
    >
      <RxHamburgerMenu />
    </div>
  );
}
