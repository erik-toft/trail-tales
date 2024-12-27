import styles from "@/app/welcome/WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>About Trail Tales!</h1>
      <p className={styles.message}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}
