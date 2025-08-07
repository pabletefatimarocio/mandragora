"use client";

import useCalendar from "@/hooks/swr/useCalendar";
import CalendarTile from "./CalendarTile";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import styles from "./styles/Calendar.module.css";

export default function Calendar({ date }) {
  const { calendar, isLoading, error } = useCalendar(date);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>ERROR</div>;

  console.log(calendar);

  return (
    <div className={styles.container}>
      <span className={styles.date}>
        {calendar.month} {calendar.year}
      </span>
      <div className={styles.calendarContainer}>
        <div className={styles.weekDays}>
          {calendar.weekDays.map((weekDay) => (
            <p key={weekDay}>{weekDay}</p>
          ))}
        </div>
        <div className={styles.calendar}>
          {calendar.calendar.map((row, i) => (
            <div key={i} className={styles.calendarRow}>
              {row.map((tile, j) => (
                <CalendarTile key={`${j}${tile.day}`} tile={tile} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.legends}>
        <div className={styles.legend}>
          <div className={styles.waterIcon}>
            <BsDropletFill />
          </div>
          <p>Agua</p>
        </div>
        <div className={styles.legend}>
          <div className={styles.fertilizerIcon}>
            <GiPowderBag />
          </div>
          <p>Fertilizante</p>
        </div>
      </div>
    </div>
  );
}
