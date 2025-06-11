import WarningList from "@/components/WarningList";
import styles from "./HomePage.module.css";
import Link from "next/link";
import CardsPlants from "@/components/CardsPlants";
import { AiOutlinePlus } from "react-icons/ai";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.warnings}>
        {session?.user && <h1>{`Hola, ${session.user.name.split(" ")[0]}`}</h1>}
        <WarningList />
      </div>
      <div className={styles.content}>
        <h1>Mis plantas</h1>
        <Link href="/plants">Ver todas</Link>
      </div>

      <CardsPlants type="home" />

      <Link href="/add" className={styles.button}>
        Nueva planta <AiOutlinePlus className={styles.iconPlus} />
      </Link>

      <svg viewBox="0 0 20 20" fill="none" className={styles.bgSvg}>
        <circle cx="10" cy="-3" r="12" />
      </svg>
    </div>
  );
}
