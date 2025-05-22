"use client";

import { useState, useEffect } from "react";
import styles from "./styles/WarningList.module.css";
import WarningItem from "./WarningItem";
import { PiSealWarningFill } from "react-icons/pi";

export default function WarningList() {
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    fetch("/api/plants/warning")
      .then((res) => res.json())
      .then((resJSON) => setWarnings(resJSON));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <PiSealWarningFill />
        <span>Necesitan tu cuidado</span>
      </div>
      {warnings.map((item, i) => {
        return (
          <div key={item.id}>
            {i !== 0 && <hr/>}
            <WarningItem plant={item} />
          </div>
        );
      })}
    </div>
  );
}
