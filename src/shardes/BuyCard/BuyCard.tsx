import styles from "./BuyCard.module.scss";

interface Data {
  id: number;
  name: string;
  price: number;
  currency: string;
  stock: number;
  description: string;
  onDelToCart: (id: number[]) => void;
}

export const BuyCard = ({
  id,
  name,
  price,
  currency,
  stock,
  description,
  onDelToCart,
}: Data) => {
  return (
    <div className={`${styles.card}`}>
      <h3>{name}</h3>
      <div className={styles.productInfo}>
        <p className={styles.price}>
          Цена: {price} {currency}
        </p>
      </div>
      <p>Описание: {description}</p>
      <button onClick={() => onDelToCart([id])}>Удалить</button>
    </div>
  );
};
