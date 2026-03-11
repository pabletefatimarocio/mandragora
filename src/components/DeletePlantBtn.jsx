"use client";

import { useState } from "react";
import styles from "./styles/DeletePlantBtn.module.css";
import { redirect } from "next/navigation";
import { BsFillTrash3Fill } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";

export default function DeletePlantBtn({ id }) {
  const [confirmationPanelView, setConfirmationPanelView] = useState(false);

  //HANDLE DELETE
  async function handleDelete() {
    const res = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      redirect("/plants");
    }
  }

  return (
    <div className={styles.deleteBtnContainer}>
      {confirmationPanelView && (
        <div className={styles.panelBackground}>
          <div className={styles.confirmationPanel}>
            <GoAlertFill size={35} />
            <span>¿Deseas eliminar esta planta?</span>
            <div className={styles.confirmBtns}>
              <button type="button" onClick={handleDelete} className={styles.confirmBtn}>
                Si
              </button>
              <button type="button" onClick={() => setConfirmationPanelView(false)} className={styles.confirmBtn}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setConfirmationPanelView(true)} className={styles.deleteBtn}>
        <BsFillTrash3Fill color="red" size={20} />
      </button>
    </div>
  );
}
