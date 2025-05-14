import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <Link href="/login" className={styles.forgot}>Olvidaste tu contraseña?</Link>
        <button>Continuar</button>
      </form>
      <div>
        <span>No tienes una cuenta?</span>
        <Link href="/signup">Registrarse</Link>
      </div>
      <div>
        <span>o</span>
      </div>
      <Link href="/login">Google</Link>
    </div>
  );
}
