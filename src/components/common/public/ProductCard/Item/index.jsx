/* eslint-disable react/prop-types */
import styles from "./index.module.scss";
export default function Item({ name }) {
  return (
    <div className={styles.slide_container}>
      <div className={styles.slide_content}>
        <div className={styles.card_wrapper}>
          <div className={styles.card}>
            <div className={styles.image_content}>
              <span className={styles.overlay}></span>
              <div className={styles.card_image}></div>
            </div>
            <div className={styles.card_content}>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.description}>description service</p>
              <button className={styles.button}>View More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
