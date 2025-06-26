import WarningList from "@/components/WarningList";
import Link from "next/link";
import CardsPlants from "@/components/CardsPlants";
import { AiOutlinePlus } from "react-icons/ai";
import { auth } from "@/lib/auth";
import styles from "./HomePage.module.css";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      {session?.user && (
        <h1 className={styles.welcome}>{`Hola, ${
          session.user.name.split(" ")[0]
        }`}</h1>
      )}
      <div className={styles.content}>
        <WarningList />

        <div className={styles.myplants}>
          <div className={styles.myplantsTitle}>
            <h1>Mis plantas</h1>
            <Link href="/plants">Ver todas</Link>
          </div>
          <CardsPlants type="home" />
        </div>
      </div>

      <Link href="/add" className={styles.button}>
        Nueva planta <AiOutlinePlus className={styles.iconPlus} />
      </Link>

      <svg viewBox="0 0 20 20" fill="none" className={styles.bgSvg}>
        <circle cx="10" cy="-3" r="12" />
      </svg>
    </div>
  );
}
