import { GiPlantRoots } from "react-icons/gi";
import styles from "./styles/PopulateBtn.module.css";
import { mutate } from "swr";

export default function PopulateBtn() {
  async function populate() {
    const res = await fetch("/api/dev/mock-plants", {
      method: "POST",
    });

    if (res.ok) mutate((key) => key.startsWith("/api/plants"));
  }

  return (
    <button className={styles.btn} onClick={populate}>
      <GiPlantRoots />
    </button>
  );
}
