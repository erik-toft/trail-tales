// components/Footer.tsx
import Link from "next/link";
import styles from "@/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>Trail Tales &copy; 2024</p>
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
