"use client";

import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import { BiSolidHomeHeart, BiSolidCalendar } from "react-icons/bi";
import { ImLeaf } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { usePathname } from "next/navigation";
import dateFormater from "@/utils/dateFormater";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link href="/home" className={pathname === "/home" ? styles.active : undefined}>
        <BiSolidHomeHeart fontSize={"35px"} />
        <span>Home</span>
      </Link>
      <Link href="/add" className={pathname === "/add" ? styles.active : undefined}>
        <AiOutlinePlus fontSize={"38px"} />
        <span>Agregar</span>
      </Link>
      <Link href="/plants" className={pathname === "/plants" ? styles.active : undefined}>
        <ImLeaf fontSize={"30px"} />
        <span>Mis plantas</span>
      </Link>
      <Link
        href={`/calendar/${dateFormater(Date.now())}`}
        className={pathname === "/calendar" ? styles.active : undefined}
      >
        <BiSolidCalendar fontSize={"35px"} />
        <span>Calendario</span>
      </Link>
    </nav>
  );
}
