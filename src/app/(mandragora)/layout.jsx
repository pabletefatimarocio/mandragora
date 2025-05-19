import styles from "./MandragoraLayout.module.css";

export default function MandragoraLayout({children}){
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}