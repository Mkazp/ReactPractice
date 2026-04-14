import styles from "./ProductDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { useMarketBin } from "../../store/marketStore";

interface Product {
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
}

interface Props {
  product: Product;
}

export const ProductDetails = ({ product }: Props) => {
  const navigate = useNavigate();

  const counterInc = useMarketBin((state) => state.counterInc);

  const onAddToCart = () => {
    counterInc({
      id: [product.id],
      counter: 1,
    });
  };

  return (
    <div className={styles.wrapper}>
      
      <button
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <div className={styles.content}>
        <img src={product.image} alt={product.name} />

        <div className={styles.info}>
          <h1>{product.name}</h1>

          <p>Категория: {product.category}</p>

          <p>★ {product.rating}</p>

          <p className={styles.price}>
            {product.price} {product.currency}
          </p>

          <p>{product.description}</p>

          <button className={styles.button} onClick={onAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>

    </div>
  );
};