import styles from "@/app/welcome/WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Contact Trail Tales!</h1>
      <p className={styles.message}>here will be contact information</p>
      {/* <div>
        <a href="/login">
          <button className={styles.button}>Login</button>
        </a>
        <a href="/register">
          <button className={styles.button}>Register</button>
        </a>
      </div> */}
    </div>
  );
}
