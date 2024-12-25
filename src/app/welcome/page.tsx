import styles from "@/app/welcome/WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome!</h1>
      <p className={styles.message}>
        If you&apos;re new, please register. If you already have an account,
        login!
      </p>
      <div>
        <a href="/login">
          <button className={styles.button}>Login</button>
        </a>
        <a href="/register">
          <button className={styles.button}>Register</button>
        </a>
      </div>
    </div>
  );
}
