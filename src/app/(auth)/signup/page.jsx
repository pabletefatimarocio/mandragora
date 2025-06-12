import SignupForm from "@/components/SignupForm";
import GoogleBtn from "@/components/GoogleBtn";
import styles from "./SignupPage.module.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await auth();

  if (session) redirect("/home");

  return (
    <div className={styles.container}>
      <SignupForm />
      <div className={styles.o}>
        <span>o</span>
      </div>
      <GoogleBtn />
    </div>
  );
}
