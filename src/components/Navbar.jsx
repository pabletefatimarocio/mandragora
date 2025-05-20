import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import {BiSolidHomeHeart, BiSolidCalendar} from "react-icons/bi";
import {ImLeaf} from "react-icons/im";
import {AiOutlinePlus} from "react-icons/ai";

export default function Navbar(){
    return(
        <nav className={styles.nav}>
            <Link href="/home"><BiSolidHomeHeart fontSize={'35px'}/></Link>
            <Link href="/add"><AiOutlinePlus fontSize={'38px'}/></Link>
            <Link href="/plants"><ImLeaf fontSize={'30px'}/></Link>
            <Link href="/calendar"><BiSolidCalendar fontSize={'35px'}/></Link>            
        </nav>
    )
}