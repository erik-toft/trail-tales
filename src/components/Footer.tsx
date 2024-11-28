import Link from "next/link";
import styles from "@/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>&copy; 2024 Trail Tales</p>
      </div>

      <div className={styles.right}>
        <Link href="/contact" className={styles.contactLink}>
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
