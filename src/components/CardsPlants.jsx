"use client";

import { useEffect, useState } from "react";
import styles from "./styles/CardsPlants.module.css";
import CardPlant from "./CardPlant.jsx";

export default function CardsPlants({type}) {
  const [cardsPlants, setCardsPlants] = useState([]);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((resJSON) => {
        if (type === "home") {
          setCardsPlants(resJSON.slice(0,4))
        } else if(type === "myplants") {
          setCardsPlants(resJSON)
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      {cardsPlants.map((item) => {
        return <CardPlant plant={item} key={item.id} />;
      })}
    </div>
  );
}
