import styles from "./Card.module.scss";

interface Data {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  isPremium: boolean;
  stock: number;
  rating: number;
  description: string;
  onAddToCart: (item: { id: number[]; counter: number }) => void;

}

export const Card = ({
  id,
  name,
  category,
  price,
  currency,
  rating,
  description,
  isPremium,
  onAddToCart,

}: Data) => {
  return (
    <div
      className={`${styles.card} ${isPremium ? styles.premium : styles.default}`}
    >
      <h3>{name}</h3>
      <p>Категория: {category}</p>
      <div className={styles.productInfo}>
        <p className={styles.rating}>★ {rating}</p>
        <p className={styles.price}>
          Цена: {price} {currency}
        </p>

      </div>
      <p>Описание: {description}</p>
      <button onClick={() => onAddToCart({ id: [id], counter: 0 })}>
        Купить
      </button>
    </div>
  );
};
