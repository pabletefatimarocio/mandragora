"use client";

import { useEffect, useState } from "react";
import CardPlant from "./CardPlant.jsx";
import Image from "next/image";
import styles from "./styles/CardsPlants.module.css";

export default function CardsPlants({ type }) {
  const [cardsPlants, setCardsPlants] = useState([]);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((resJSON) => {
        if (type === "home") {
          setCardsPlants(resJSON.slice(0, 4));
        } else if (type === "myplants") {
          setCardsPlants(resJSON);
        }
      });
  }, []);

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
