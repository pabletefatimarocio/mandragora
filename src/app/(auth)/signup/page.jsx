"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GoogleBtn from "@/components/GoogleBtn";
import styles from "./SignupPage.module.css";

export default function SignupPage() {
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
        <input type="text" placeholder="Email"></input>
        <input type="password" placeholder="Contraseña"></input>
        <input type="password" placeholder="Confirmar contraseña"></input>
        <div>
          <button>Continuar</button>
          <span>
            Ya tienes una cuenta? <Link href="/login">Ingresar</Link>
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
