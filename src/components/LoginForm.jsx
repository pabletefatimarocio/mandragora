"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./styles/LoginForm.module.css";

const userInitialState = {
  name: "",
  email: "",
  password: "",
};

export default function LoginForm() {
  const [user, setUser] = useState(userInitialState);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  function handleChange(e) {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...user,
      redirect: false,
    });

    if (res.error) {
      if (res.error === "CredentialsSignin") {
        setErrors((prevState) => [...prevState, "Credenciales inválidas"]);
      } else {
        setErrors((prevState) => [...prevState, "Error desconocido"]);
      }
    } else {
      router.push("/home");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nombre de usuario"
      />
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <div>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <span>
          <Link href="/login">Olvidaste tu contraseña?</Link>
        </span>
      </div>
      {errors.length > 0 && (
        <ul className={styles.errors}>
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>;
          })}
        </ul>
      )}
      <div>
        <button>Continuar</button>
        <span>
          No tienes una cuenta? <Link href="/signup">Registrarse</Link>
        </span>
      </div>
    </form>
  );
}
