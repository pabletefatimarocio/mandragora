"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GoogleBtn from "@/components/GoogleBtn";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Email" />
        <div>
          <input type="password" placeholder="Contraseña" />
          <span>
            <Link href="/login">Olvidaste tu contraseña?</Link>
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
      <GoogleBtn />
    </div>
  );
}
