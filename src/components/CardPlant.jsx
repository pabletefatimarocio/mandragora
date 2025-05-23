import styles from "./styles/CardPlant.module.css";
import Image from "next/image";

export default function CardPlant({ plant }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image src={plant.img} alt="" fill />
        </div>
        <div className={styles.text}>
          <h2>{plant.name}</h2>
          <h3>{plant.scientific}</h3>
        </div>
      </div>
    </div>
  );
}
