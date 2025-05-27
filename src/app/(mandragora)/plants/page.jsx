import styles from "./MyPlantsPage.module.css";
import CardsPlants from "@/components/CardsPlants";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function MyPlantsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Mis plantas</h1>
      </div>
      <div className={styles.searchbar}>
        <input type="text" placeholder="Busca tu planta..."/>
        <FaMagnifyingGlass className={styles.icon}/>
      </div>
      <CardsPlants type="myplants" />
    </div>
  );
}
