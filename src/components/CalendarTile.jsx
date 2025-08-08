"use client";

import { useState } from "react";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import CalendarEvents from "./CalendarEvents";
import styles from "./styles/CalendarTile.module.css";

export default function CalendarTile({ tile, date }) {
  const [eventsVisibility, setEventsVisibility] = useState(false);

  return (
    <>
      <div
        className={`
        ${styles.tile}
        ${
          tile.month === +date.split("-")[1] &&
          tile.day === +date.split("-")[0] &&
          (tile.events.water || tile.events.fertilize)
            ? styles.cursor
            : ""
        }
        ${tile.outline === "outside" ? styles.outside : ""}
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
      {eventsVisibility && <CalendarEvents tile={tile} setEventsVisibility={setEventsVisibility} date={date} />}
    </>
  );
}
