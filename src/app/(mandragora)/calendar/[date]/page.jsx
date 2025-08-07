import Calendar from "@/components/Calendar";

import styles from "./CalendarPage.module.css";

export default async function CalendarPage({ params }) {
  const { date } = await params;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Calendario</h1>
      </div>
      <Calendar date={date} />      
    </div>
  );
}
