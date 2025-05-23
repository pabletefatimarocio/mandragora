import styles from "./MandragoraLayout.module.css";
import Navbar from "@/components/Navbar.jsx";
import Menu from "@/components/Menu.jsx";

export default function MandragoraLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.scrollArea}>
      <Menu />
      {children}
      </div>
      <Navbar />
    </div>
  );
}
