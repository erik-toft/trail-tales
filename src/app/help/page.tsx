import styles from "@/app/welcome/WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Here to help</h1>
      <p className={styles.message}>Here will be the help section</p>
    </div>
  );
}
