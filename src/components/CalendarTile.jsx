import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import styles from "./styles/CalendarTile.module.css";

export default function CalendarTile({ tile }) {
  return (
    <div
      className={`
        ${styles.tile} ${tile.outline === "outside" ? styles.outside : ""}
        ${tile.outline === "today" ? styles.today : ""}
      `}
    >
      <span className={styles.day}>{tile.day}</span>
      <div className={styles.icons}>
        {tile.events.water && <BsDropletFill className={styles.drop} />}
        {tile.events.fertilize && <GiPowderBag className={styles.bag} />}
      </div>
    </div>
  );
}
