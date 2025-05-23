import WarningList from "@/components/WarningList";
import styles from "./HomePage.module.css";
import Link from "next/link";
import CardsPlants from "@/components/CardsPlants";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.warnings}>
        <h1>Hola, Juan José</h1>
        <WarningList />
      </div>
      <div className={styles.content}>
        <h1>Mis plantas</h1>
        <Link href="/plants">Ver todas</Link>
      </div>

      <CardsPlants />

      <svg viewBox="0 0 20 20" fill="none" className={styles.bgSvg}>
        <circle cx="10" cy="-3" r="12" />
      </svg>
    </div>
  );
}
