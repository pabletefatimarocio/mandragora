import Link from 'next/link';
import styles from './styles/NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href='/home'>H</Link>
      <Link href='/add'>A</Link>
      <Link href='/plants'>P</Link>
      <Link href='/calendar'>C</Link>
    </nav>
  );
}