"use client";

import { useState } from "react";
import useCalendar from "@/hooks/swr/useCalendar";
import { GiWateringCan } from "react-icons/gi";
import styles from "./styles/WaterPlantBtn.module.css";

export default function WaterPlantBtn({ plantID, date }) {
  const [panelVisibility, setPanelVisibility] = useState(false);
  const { mutate } = useCalendar(date);

  function waterPlant(id) {
    fetch("/api/plants/water", {
      method: "PUT",
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  }

  return (
    <>
      <button onClick={() => setPanelVisibility(true)} className={styles.waterBtn}>
        <GiWateringCan />
      </button>
      {panelVisibility && (
        <div className={styles.panel}>
          <p className={styles.panelText}>¿Deseas regar esta planta?</p>
          <div className={styles.panelButtons}>
            <button className={styles.yesBtn} onClick={() => waterPlant(plantID)}>
              Si
            </button>
            <button className={styles.noBtn} onClick={() => setPanelVisibility(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}
