import WarningList from "@/components/WarningList";
import styles from "./HomePage.module.css";

export default function HomePage(){  

    return(
        <div className={styles.container}>
            <h1 className={styles.welcome}>Hola, Juan José</h1>
            <WarningList/>
            <svg viewBox="0 0 20 20" fill="none" className={styles.bgSvg}>
                <circle cx='10' cy='-3' r='12' />
            </svg>            
        </div>
    )
}