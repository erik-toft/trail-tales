import styles from "@/app/help/Info.module.css";

export default function Info() {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h1 className={styles.header}>How to Use Trail Tales</h1>
        <p className={styles.message}>
          Welcome to Trail Tales! Heres a quick guide on how to document your
          travels using our app.
        </p>

        <section className={styles.section}>
          <h2 className={styles.header}>Adding Pins to the Map</h2>
          <p className={styles.message}>
            There are two ways to add pins to the map:
          </p>
          <ol className={styles.message}>
            <li className={styles.message}>
              <strong>Using the Add Pin Button</strong>
              <ul>
                <li>
                  Click the <em>Add Pin</em> button. It will start pulsing,
                  indicating its ready to add a pin.
                </li>
                <li>Click on the desired location on the map.</li>
                <li>
                  A form will appear. Fill in the details, add photos, and save
                  your pin.
                </li>
              </ul>
            </li>
            <li className={styles.message}>
              <strong>Using the Search Bar</strong>
              <ul>
                <li>Type a location into the search bar.</li>
                <li>Select one of the autocomplete suggestions that appear.</li>
                <li>
                  A form will appear. Fill in the details, add photos, and save
                  your pin.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.header}>Editing or Removing Pins</h2>
          <p className={styles.message}>
            You can manage your pins at any time:
          </p>
          <ul className={styles.message}>
            <li>
              To edit a pin, click on it and choose the <em>Edit Pin</em>{" "}
              option.
            </li>
            <li>
              To remove a pin, click on it and select the <em>Edit Pin</em>{" "}
              option. Scroll down to find the <em>Delete</em> button.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
