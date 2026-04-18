import styles from "./ProductDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { useMarketBin } from "../../store/marketStore";
import { useState } from "react";
import { ImageModal } from "./ImageModal/ImageModal";

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

  const [open, setOpen] = useState(false);

  const onAddToCart = () => {
    counterInc({
      id: [product.id],
      counter: 1,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
      <div className={styles.header}>
      <button
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>
    </div>

    <div className={styles.body}>
        <div className={styles.imageWrapper}>
          {product.isPremium && (
            <span className={styles.premium}>
              Premium
            </span>
          )}

          <img
            src={product.image}
            alt={product.name}
            onClick={() => setOpen(true)}
          />
        </div>

        <div className={styles.info}>
          <h1>{product.name}</h1>

          <p className={styles.category}>
            {product.category}
          </p>

          <div className={styles.rating}>
            ★ {product.rating}
          </div>

          <div className={styles.price}>
            {product.price} {product.currency}
          </div>

          <p className={styles.description}>
            {product.description}
          </p>

          <button
            className={styles.button}
            onClick={onAddToCart}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
      </div>

      {open && (
        <ImageModal
          image={product.image}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};