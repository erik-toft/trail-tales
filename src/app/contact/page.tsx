import styles from "@/app/welcome/WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Contact Trail Tales!</h1>
      <p className={styles.message}>
        Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem,
        aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit
        ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam
        lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu.{" "}
      </p>
    </div>
  );
}
