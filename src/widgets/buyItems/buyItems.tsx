import { useMarketItemsStore } from "../../store/store";
import { useMarketBin } from "../../store/marketStore";
import { BuyCard } from "../../shardes/BuyCard/BuyCard";

export const BuyItems = () => {
  const createdItems = useMarketItemsStore((state) => state.items);
  const { items: cartItems, counterDec } = useMarketBin(); // Получаем товары из корзины

  // Фильтруем товары, которые есть в корзине
  const itemsInCart = createdItems.filter((createdItem) =>
    cartItems.some((cartItem) => cartItem.id[0] === createdItem.id)
  );

  return (
    <div>
      <h3>Добавленные товары</h3>
      {itemsInCart.map((item) => (
        <BuyCard key={item.id} {...item} onDelToCart={counterDec} />
      ))}
    </div>
  );
};
