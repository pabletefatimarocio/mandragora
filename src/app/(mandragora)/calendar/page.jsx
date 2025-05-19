"use client";

import { useState } from "react";
import { createCalendar } from "@/utils/calendar";
import styles from "./CalendarPage.module.css";

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const calendar = createCalendar(year, month, day);

  return (
    <div className={styles.container}>
      <div className={styles.head}>HAMBURGER</div>
      <div className={styles.shell}>
        <h1>Calendario</h1>
        <h3>
          {calendar.month} {calendar.year}
        </h3>
        <div className={styles.calendar}>
          <div className={styles.days}>
            {calendar.calendar[0].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          {calendar.calendar.slice(1).map((row, i) => (
            <div key={i} className={styles.row}>
              {row.map((item, j) => (
                <div
                  key={item.day * j}
                  className={styles.card}
                  style={item.type === "outside" ? { opacity: 0.5 } : undefined}
                >
                  {item.day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className={styles.newEntryBtn}>Nueva Entrada</button>
    </div>
  );
}
