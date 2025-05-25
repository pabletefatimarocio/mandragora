import Image from "next/image";
import styles from "./MyPlantsPage.module.css";
import CardsPlants from "@/components/CardsPlants";


export default function MyPlantsPage() {
   return (
    
    <div className={styles.container}>
      <CardsPlants type="myplants"/>
    </div>
    
  );
}