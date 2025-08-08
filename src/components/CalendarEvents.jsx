import Image from "next/image";
import WaterPlantBtn from "./WaterPlantBtn";
import FertilizePlantBtn from "./FertilizePlantBtn";
import { RxCross1 } from "react-icons/rx";
import { GiFlowerPot } from "react-icons/gi";
import styles from "./styles/CalendarEvents.module.css";

export default function CalendarEvents({ tile, date, setEventsVisibility }) {
  return (
    <div className={styles.container}>
      <div className={styles.events}>
        <button onClick={() => setEventsVisibility(false)} className={styles.closeBtn}>
          <RxCross1 />
        </button>
        {!tile.events.plants.length && (
          <p className={styles.noEventsMsg}>
            No hay plantas por cuidar este día.
            <GiFlowerPot color="var(--green-light)" fontSize="2rem" />
          </p>
        )}
        {tile.events.plants.map((plant) => {
          const wateringDay = new Date(plant.next_watering).getDate();
          const wateringMonth = new Date(plant.next_watering).getMonth() + 1;
          const fertilizationDay = new Date(plant.next_fertilization).getDate();
          const fertilizationMonth = new Date(plant.next_fertilization).getMonth() + 1;

          const needsWater = tile.day === wateringDay && tile.month === wateringMonth ? true : false;
          const needsFertilization = tile.day === fertilizationDay && tile.month === fertilizationMonth ? true : false;

          return (
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
              <div className={styles.buttons}>
                {needsWater && <WaterPlantBtn plantID={plant.id} date={date} />}
                {needsFertilization && <FertilizePlantBtn plantID={plant.id} date={date} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
