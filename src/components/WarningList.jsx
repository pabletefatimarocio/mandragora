"use client";

import styles from "./styles/WarningList.module.css";
import useWarnings from "@/hooks/swr/useWarnings";
import WarningItem from "./WarningItem";
import { PiSealWarningFill } from "react-icons/pi";

export default function WarningList() {
  const { warnings, isLoading, error } = useWarnings();

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <PiSealWarningFill />
        <span>Necesitan tu cuidado</span>
      </div>
      {warnings.length === 0 && <p className={styles.noWarnings}>No hay plantas por regar ni fertilizar</p>}
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
