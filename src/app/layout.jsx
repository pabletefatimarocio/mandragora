import { SessionProvider } from "next-auth/react";
import { Fleur_De_Leah, Thasadith } from "next/font/google";
import styles from "./RootLayout.module.css";
import "./globals.css";

const fontTitle = Fleur_De_Leah({
  variable: "--font-title",
  weight: ["400"],
  subsets: ["latin"],
});

const fontText = Thasadith({
  variable: "--font-text",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Mandragora",
  description: "App para el cuidado de las plantas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${fontTitle.variable} ${fontText.variable}`}>
          <div className={styles.rootLayout}>{children}</div>
        </body>
      </SessionProvider>
    </html>
  );
}
