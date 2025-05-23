import Image from "next/image";
import styles from "./CalendarPage.module.css";

export default function CalendarPage(){
    return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="/assets/backgrounds/planting tree-bro.png" alt="" fill />
      </div>
    </div>
  );
}