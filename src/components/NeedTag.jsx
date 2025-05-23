import styles from "./styles/NeedTag.module.css";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";

export default function NeedTag({ need }) {
  return (
    <div className={`${styles.container} ${styles[need]}`}>
      {need === 'regar' && <BsDropletFill className={styles.icon}/>}
      {need === 'fertilizar' && <GiPowderBag className={styles.icon}/>}
      <span>{need}</span>
    </div>
  );
}
