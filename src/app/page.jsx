
import Link from "next/link";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h1>Mandragora</h1>
        <p>Cuida tus plantas</p>
      </div>
      <Link href={"/login"} className={styles.start}>ENTRAR</Link>
     
    </div>
  );
}
