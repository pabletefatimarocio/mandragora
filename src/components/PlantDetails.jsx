"use client";

import styles from "./styles/PlantDetails.module.css";
import Image from "next/image";
import { PiPottedPlantFill } from "react-icons/pi";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiPencilLight } from "react-icons/pi";
import usePlantDetails from "@/hooks/swr/usePlantDetails";

export default function PlantDetails({ id }) {
  const { plant, isLoading, error } = usePlantDetails(id);

  if (isLoading) return <div>CARGANDO... </div>;
  if (error) return <div>ERROR</div>;

  console.log(plant);

  const lastWatering = new Date(plant.waterings[plant.waterings.length - 1]).toLocaleDateString("es", {
    month: "long",
    day: "numeric",
  });

  const lastFertilization = new Date(plant.fertilizations[plant.fertilizations.length - 1]).toLocaleDateString("es", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImg}>
        <Image src={plant.img} alt="" fill priority />
      </div>

      <div className={styles.content}>
        {/* INFO */}
        <div className={styles.info}>
          <PiPencilLight className={styles.pencilInfo} />
          <div className={styles.name}>
            <h1>{plant.name}</h1>
            <h3>{plant.scientific}</h3>
          </div>

          <div className={styles.attributes}>
            <div className={styles.attribute}>
              <div className={styles.iconDrop}>
                <BsDropletFill />
              </div>
              <div className={styles.text}>
                <p>
                  Riego cada <b>{plant.watering}</b> días
                </p>
                <p>
                  Ultimo riego: <b>{lastWatering}</b>
                </p>
              </div>
            </div>
            <div className={styles.attribute}>
              <div className={styles.iconBag}>
                <GiPowderBag />
              </div>
              <div className={styles.text}>
                <p>
                  Fertilizante cada <b>{plant.fertilization}</b> días
                </p>
                <p>
                  Última fertilización: <b>{lastFertilization}</b>
                </p>
              </div>
            </div>
            <div className={styles.attribute}>
              <div className={styles.iconPlant}>
                <PiPottedPlantFill />
              </div>
              <div className={styles.text}>
                <p>{plant.location_type}</p>
                <p>
                  <b>{plant.location_place}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* TAGS */}
        <div className={styles.tags}>
          {plant.tags.map((tag) => (
            <div key={tag.id} className={styles.tag} style={{ backgroundColor: tag.color }}>
              <p>{tag.name}</p>
            </div>
          ))}
          <AiOutlinePlusCircle className={styles.plus} />
        </div>
        {/* NOTES */}
        <div className={styles.notes}>
          <div className={styles.titleNotes}>
            <h1>NOTAS</h1>
            <PiPencilLight className={styles.pencilNotes} />
          </div>
          <hr className={styles.hr} />
          <div className={styles.notesContent}>
            {plant.notes.map((note) => {
              const date = new Date(note.created_at).toLocaleDateString("es", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div key={note.id}>
                  <p className={styles.noteDate}>{date}</p>
                  <p>{note.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
