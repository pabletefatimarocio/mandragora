import AddPlantForm from "@/components/AddPlantForm";
import styles from "./AddPage.module.css";

export default function AddPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agregar Planta</h1>
      <AddPlantForm />
    </div>
  );
}
