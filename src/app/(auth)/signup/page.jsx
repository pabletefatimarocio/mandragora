import Link from "next/link";
import styles from "./SignupPage.module.css";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Email"></input>
        <input type="password" placeholder="Contraseña"></input>
        <input type="password" placeholder="Confirmar contraseña"></input>
        <div>
          <button>Continuar</button>
          <span >
            Ya tienes una cuenta? <Link href="/login">Ingresar</Link>
          </span>
        </div>
      </form>
      <div className={styles.o}> 
      <span>o</span>
      </div>
      <Link href="/home" className={styles.googleBtn}>
        <FcGoogle fontSize='30px'/> Google
      </Link>
    </div>
  );
}
