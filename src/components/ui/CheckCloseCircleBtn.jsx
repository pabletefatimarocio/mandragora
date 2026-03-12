import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./styles/CheckCloseCircleBtn.module.css";

export default function CheckCloseCircleBtn({ variant, type, onClick, disabled, size }) {
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${variant === "check" && styles.checkBtn} ${variant === "close" && styles.closeBtn}`}
      type={type}
      onClick={onClick}
    >
      {variant === "check" && <AiOutlineCheckCircle size={size || 30} />}
      {variant === "close" && <AiOutlineCloseCircle size={size || 30} />}
    </button>
  );
}
