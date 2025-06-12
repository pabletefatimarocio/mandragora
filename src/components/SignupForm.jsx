"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./styles/SignupForm.module.css";
import { userInputSchema } from "@/schemas/zod/users";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const newUserInitialState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

export default function SignupForm() {
  const [newUser, setNewUser] = useState(newUserInitialState);
  const [errors, setErrors] = useState([]);
  const [disabledSignup, setDisabledSignup] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    if (disabledSignup) {
      setDisabledSignup(false);
    }

    setNewUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabledSignup(true);
    setErrors([]);

    const zodRes = userInputSchema.safeParse(newUser);

    if (!zodRes.success) {
      zodRes.error.errors.forEach((error) =>
        setErrors((prevState) => [...prevState, error.message])
      );
    } else {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const resJSON = await res.json();

        const user = resJSON.data;

        const resAuth = await signIn("credentials", {
          ...user,
          redirect: false,
        });

        if (resAuth.ok) {
          router.push("/home");
        }
      } else {
        if (res.status === 400) {
          setErrors((prevState) => [
            ...prevState,
            "Email: Asociado a otra cuenta",
          ]);
        } else if (res.status === 500) {
          setErrors((prevState) => [
            ...prevState,
            "Error interno del servidor",
          ]);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleChange}
        placeholder="Nombre de usuario"
      />
      <input
        type="text"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <input
        type="password"
        name="confirm"
        value={newUser.confirm}
        onChange={handleChange}
        placeholder="Confirmar contraseña"
      />
      {errors.length > 0 && (
        <ul className={styles.errors}>
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>;
          })}
        </ul>
      )}
      <div>
        <button disabled={disabledSignup}>Continuar</button>
        <span>
          Ya tienes una cuenta? <Link href="/login">Ingresar</Link>
        </span>
      </div>
    </form>
  );
}
