import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

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
  image: string;
  onAddToCart?: (item: { id: number[]; counter: number }) => void;
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
  image
}: Data) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.card} ${isPremium ? styles.premium : styles.default}`}
    >

      <img src={image} alt={name} className={styles.image} />

      <h3>{name}</h3>

      <p>Категория: {category}</p>

      <div className={styles.productInfo}>
        <p className={styles.rating}>★ {rating}</p>

        <p className={styles.price}>
          Цена: {price} {currency}
        </p>
      </div>

      <p>Описание: {description}</p>

    </div>
  );
};