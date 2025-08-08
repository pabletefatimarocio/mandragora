"use client";

import { useState } from "react";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import styles from "./styles/CalendarTile.module.css";
import CalendarEvents from "./CalendarEvents";

export default function CalendarTile({ tile, date }) {
  const [eventsVisibility, setEventsVisibility] = useState(false);

  return (
    <>
      <div
        className={`
        ${
          tile.month === "current" && tile.day === +date.split("-")[0] && (tile.events.water || tile.events.fertilize)
            ? styles.cursor
            : ""
        }
        ${styles.tile} ${tile.outline === "outside" ? styles.outside : ""}
        ${tile.outline === "today" ? styles.today : ""}
      `}
        onClick={() => setEventsVisibility(true)}
      >
        <span className={styles.day}>{tile.day}</span>
        <div className={styles.icons}>
          {tile.events.water && <BsDropletFill className={styles.drop} />}
          {tile.events.fertilize && <GiPowderBag className={styles.bag} />}
        </div>
      </div>
      {eventsVisibility && <CalendarEvents plants={tile.events.plants} setEventsVisibility={setEventsVisibility} />}
    </>
  );
}
