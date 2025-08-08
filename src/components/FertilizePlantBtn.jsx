"use client";

import { useState, useEffect, useRef } from "react";
import useCalendar from "@/hooks/swr/useCalendar";
import { GiFertilizerBag } from "react-icons/gi";
import styles from "./styles/FertilizePlantBtn.module.css";

export default function FertilizePlantBtn({ plantID, date }) {
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
        <div className={styles.panel} ref={panelRef}>
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
