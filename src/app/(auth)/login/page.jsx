import { auth } from "@/lib/auth";
import GoogleBtn from "@/components/GoogleBtn";
import LoginForm from "@/components/LoginForm";
import styles from "./LoginPage.module.css";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) redirect("/home");

  return (
    <div className={styles.container}>
      <LoginForm />
      <div className={styles.o}>
        <span>o</span>
      </div>
      <GoogleBtn />
    </div>
  );
}
