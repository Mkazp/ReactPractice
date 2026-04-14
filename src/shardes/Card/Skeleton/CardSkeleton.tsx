import styles from "./CardSkeleton.module.scss";

export const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />

      <div className={styles.title} />

      <div className={styles.description} />

      <div className={styles.productInfo}>
        <div className={styles.price} />
        <div className={styles.rating} />
      </div>

      <div className={styles.button} />
    </div>
  );
};