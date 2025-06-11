'use client';

import { useEffect, useState } from 'react';
import styles from "./styles/PlantDetails.module.css";

export default function PlantDetails({ id }){
  const [ plant, setPlant ] = useState({ name: '' });

  useEffect(() => {
    fetch(`/api/plants/details/${id}`)
      .then(res => res.json())
      .then(resJSON => setPlant(resJSON))
  }, []);

  return(
    <div className={styles.container}>
      <h1>DETAILS</h1>
      <h2>{plant.name}</h2>
    </div>
  )
}