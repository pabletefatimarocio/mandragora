import styles from "./MandragoraLayout.module.css";
import Navbar from "@/components/Navbar.jsx";

export default function MandragoraLayout({children}){
    return(
        <div className={styles.container}>
            {children}
            <Navbar />
        </div>
    )
}