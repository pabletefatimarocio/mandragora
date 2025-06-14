import { GiPlantRoots } from "react-icons/gi";
import styles from "./styles/PopulateBtn.module.css";

export default function PopulateBtn() {
  async function populate() {
    await fetch("/api/dev/mock-plants", {
      method: "POST",
    });
  }

  return (
    <button className={styles.btn} onClick={populate}>
      <GiPlantRoots />
    </button>
  );
}
