import styles from "./CalendarPage.module.css";

export default async function CalendarPage({ params }) {
  const { date } = await params;

  return (
    <div className={styles.container}>
      <h1>{date}</h1>
    </div>
  );
}
