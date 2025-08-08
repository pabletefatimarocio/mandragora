"use client";

import { useEffect, useRef, useState } from "react";
import useCalendar from "@/hooks/swr/useCalendar";
import { GiWateringCan } from "react-icons/gi";
import styles from "./styles/WaterPlantBtn.module.css";

export default function WaterPlantBtn({ plantID, date }) {
  const [panelVisibility, setPanelVisibility] = useState(false);
  const panelRef = useRef(null);
  const { mutate } = useCalendar(date);

  useEffect(() => {
    function clickListener(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setPanelVisibility(false);
      }
    }

    document.addEventListener("mousedown", clickListener);

    return () => {
      document.removeEventListener("mousedown", clickListener);
    };
  }, []);

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
        <div className={styles.panel} ref={panelRef}>
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
