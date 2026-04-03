import { Link } from "react-router-dom";
import { useMarketBin } from "../../store/marketStore";
import { useEffect, useState } from "react";
import styles from "./MarketBin.module.scss";

const MarketBin = () => {
  const { totalItems } = useMarketBin();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <div className={styles.cartContainer}>
      <Link to="/cart" className={styles.cartLink}>
        <div className={styles.cartIcon}>
          <img
            src="/bin.png"
            alt="Корзина"
            className={`${styles.cartImage} ${animate ? styles.shake : ""}`}
          />
          {totalItems > 0 && (
            <span
              className={`${styles.badge} ${animate ? styles.badgePop : ""}`}
            >
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MarketBin;
