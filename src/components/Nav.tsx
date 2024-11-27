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
        <Link href="/help" className={styles.navLink}>
          Help
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
