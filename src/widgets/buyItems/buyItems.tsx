import { useState, useEffect } from "react";

import { useMarketItemsStore } from "../../store/store";
import { useMarketBin } from "../../store/marketStore";
import { BuyCard } from "../../shardes/BuyCard/BuyCard";

import style from "./buyItems.module.scss";

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
  image?: string;
}

export const BuyItems = () => {
  const createdItems = useMarketItemsStore((state) => state.items);
  const { items: cartItems, counterDec } = useMarketBin();
    const { totalItems } = useMarketBin();

  const [items, setItems] = useState<Data[]>([]);

  const binitems = [...items, ...createdItems];
  const filtered = [...binitems];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/items.json");
      const data = await response.json();
      setItems(data.products);
    };

    fetchData();
  }, []);

  const itemsInCart = filtered.filter((createdItem) =>
    cartItems.some((cartItem) => cartItem.id[0] === createdItem.id)
  );

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>🛒 Добавленные товары</h3>
        <span className={style.counter}>
          Количество товаров {totalItems} 
        </span>
      </div>

      {itemsInCart.length === 0 ? (
        <div className={style.empty}>
          <p>Корзина пуста</p>
          <span>Добавьте товары из каталога</span>
        </div>
      ) : (
        <div className={style.grid}>
        {itemsInCart.map((item) => {
          const cartItem = cartItems.find(
          (cart) => cart.id[0] === item.id
        );

        return (
          <BuyCard
            key={item.id}
            {...item}
            onDelToCart={counterDec}
            volume={cartItem?.counter || 0}
          />
        );
      })}
      </div>
      )}
    </div>
  );
};