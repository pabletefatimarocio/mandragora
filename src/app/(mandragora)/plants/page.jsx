import Image from "next/image";
import styles from "./MyPlantsPage.module.css";


export default function MyPlantsPage() {
   return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="assets/backgrounds/planting tree-bro.png" alt="" fill />
      </div>
    </div>
  );
}