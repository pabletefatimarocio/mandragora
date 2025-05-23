"use client";

import { useEffect, useState } from "react";
import styles from "./styles/CardsPlants.module.css";
import CardPlant from "./CardPlant.jsx";

export default function CardsPlants() {
  const [cardsPlants, setCardsPlants] = useState([]);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((resJSON) => setCardsPlants(resJSON));
  }, []);

  return (
    <div className={styles.container}>
      {cardsPlants.map((item) => {
        return <CardPlant plant={item} key={item.id} />;
      })}
    </div>
  );
}
