import Image from "next/image";
import styles from "./styles/WarningItem.module.css";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import NeedTag from "@/components/NeedTag.jsx";

export default function WarningItem({ plant }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image src={plant.img} alt="" fill />
        </div>
        <div className={styles.text}>
          <h2>{plant.name}</h2>
          <h3>{plant.scientific}</h3>
          <div className={styles.tags}>
            {plant.needs.map((need, i) => {
              return <NeedTag need={need} />;
            })}
          </div>
        </div>
      </div>
      <Link href="/calendar">
        <IoIosArrowForward />
      </Link>
    </div>
  );
}
