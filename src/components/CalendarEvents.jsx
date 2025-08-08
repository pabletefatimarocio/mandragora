import Image from "next/image";
import styles from "./styles/CalendarEvents.module.css";

export default function CalendarEvents({ plants, setEventsVisibility }) {
  const nextWateringTime = new Date(plants[1].next_watering).getTime();
  const nextFertilizationTime = new Date(plants[1].next_fertilization).getTime();

  return (
    <div className={styles.container}>
      <div className={styles.events}>
        <button onClick={() => setEventsVisibility(false)} className={styles.closeBtn}>
          X
        </button>
        {plants.map((plant) => (
          <div key={plant.id} className={styles.item}>
            <div className={styles.plant}>
              <div className={styles.plantImg}>
                <Image src={plant.img} alt="" fill />
              </div>
              <div className={styles.plantInfo}>
                <span className={styles.plantName}>{plant.name}</span>
                <span className={styles.plantScientific}>{plant.scientific}</span>
              </div>
            </div>
            <div>
              {nextWateringTime < Date.now() && <button>R</button>}
              {nextFertilizationTime < Date.now() && <button>F</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
