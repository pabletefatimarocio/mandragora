import styles from "./MandragoraLayout.module.css";
import Navbar from "@/components/Navbar.jsx";
import Menu from "@/components/Menu.jsx";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MandragoraLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.scrollArea}>{children}</div>
      <Navbar />
    </div>
  );
}
