// components/Nav.tsx
import Link from "next/link";
import styles from "@/components/Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          TT
        </Link>
      </div>

      <div className={styles.navLinks}>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/login" className={styles.navLink}>
          Login
        </Link>
        <Link href="/register" className={styles.navLink}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
