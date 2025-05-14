import Link from "next/link";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Email" />
        <div>
          <input type="password" placeholder="Contraseña" />
          <span>          
            <Link href="/login" >
              Olvidaste tu contraseña?
            </Link>
          </span>
        </div>
        <div>
          <button>Continuar</button>
          <span>
            No tienes una cuenta? <Link href="/signup">Registrarse</Link>
          </span>
        </div>
      </form>
      <div className={styles.o}>
        <span>o</span>
      </div>
      <Link href="/login" className={styles.googleBtn}>
        <FcGoogle fontSize='30px'/>
        Google
      </Link>
    </div>
  );
}
