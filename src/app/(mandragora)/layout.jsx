import NavBar from "@/components/NavBar";
import styles from './MandragoraLayout.module.css';

export default function MandragoraLayout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
      <NavBar />
    </div>
  );
}
