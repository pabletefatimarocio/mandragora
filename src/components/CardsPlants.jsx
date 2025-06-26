"use client";

import CardPlant from "./CardPlant.jsx";
import Image from "next/image";
import useCardsPlants from "@/hooks/swr/useCardsPLants.js";
import styles from "./styles/CardsPlants.module.css";

export default function CardsPlants({ type }) {
  const { cardsPlants, isLoading, error} = useCardsPlants();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>ERROR</div>;
 

  return (
    <div className={styles.container}>
      {cardsPlants.length === 0 && type === "home" && (
        <div className={styles.plantImage}>
          <Image src="/assets/images/plantHome.png" alt="" fill />
        </div>
      )}
      {cardsPlants.length === 0 && type === "myplants" && (
        <div className={styles.plantImage}>
          <Image src="/assets/images/myPlant.png" alt="" fill />
        </div>
      )}
      {cardsPlants.map((item) => {
        return <CardPlant plant={item} key={item.id} />;
      })}
    </div>
  );
}
