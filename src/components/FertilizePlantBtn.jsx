"use client";

import { useState } from "react";
import useCalendar from "@/hooks/swr/useCalendar";
import { GiFertilizerBag } from "react-icons/gi";
import styles from "./styles/FertilizePlantBtn.module.css";

export default function FertilizePlantBtn({ plantID, date }) {
  const [panelVisibility, setPanelVisibility] = useState(false);
  const { mutate } = useCalendar(date);

  function fertilizePlant(id) {
    fetch("/api/plants/fertilize", {
      method: "PUT",
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  }

  return (
    <>
      <button onClick={() => setPanelVisibility(true)} className={styles.fertilizeBtn}>
        <GiFertilizerBag />
      </button>
      {panelVisibility && (
        <div className={styles.panel}>
          <p className={styles.panelText}>¿Deseas fertilizar esta planta?</p>
          <div className={styles.panelButtons}>
            <button className={styles.yesBtn} onClick={() => fertilizePlant(plantID)}>
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
