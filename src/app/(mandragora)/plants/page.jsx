import CardsPlants from "@/components/CardsPlants";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./MyPlantsPage.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

export default function MyPlantsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Mis plantas</h1>
      </div>
      <div className={styles.searchbar}>
        <input type="text" placeholder="Busca tu planta..."/>
        <FaMagnifyingGlass className={styles.icon}/>
      </div>
      <CardsPlants type="myplants" />
      <Link href="/add" className={styles.button}>
        Nueva planta <AiOutlinePlus className={styles.iconPlus} />
      </Link>
    </div>
  );
}
