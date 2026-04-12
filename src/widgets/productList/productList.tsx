import { useState, useEffect, useMemo } from "react";
import styles from "./productList.module.scss";

import { Card } from "../../shardes/Card/Card";
import CardSelect from "../../shardes/Select/CardSelect";
import ItemsSearch from "../../shardes/Search/ItemsSearch";
import PriceFilter from "../../shardes/PriceFilter/PriceFilter";
import RatingFilter from "../../shardes/RatingFilter/RatingFilter";
import CategoryFilter from "../../shardes/CategoryFilter/CategoryFilter";

import { useMarketItemsStore } from "../../store/store";
import { useMarketBin } from "../../store/marketStore";

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
}

const DEFAULT_PRICE: [number, number] = [0, 1000];

export const ProductList = () => {
  const [items, setItems] = useState<Data[]>([]);

  const [sort, setSort] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [priceRange, setPriceRange] =
    useState<[number, number]>(DEFAULT_PRICE);

  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const createdItems = useMarketItemsStore((state) => state.items);
  const { counterInc } = useMarketBin();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/items.json");
      const data = await res.json();
      setItems(data.products ?? []);
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    const all = [...items, ...createdItems];
    return [...new Set(all.map((i) => i.category))];
  }, [items, createdItems]);

  const filteredItems = useMemo(() => {
    const all = [...items, ...createdItems];

    return all
      .filter((item) => {
        if (sort === "isPremium") return item.isPremium;
        if (sort === "!isPremium") return !item.isPremium;
        return true;
      })

      .filter((item) =>
        searchQuery
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )

      .filter(
        (item) =>
          item.price >= priceRange[0] &&
          item.price <= priceRange[1]
      )

      .filter((item) =>
        rating > 0 ? item.rating >= rating : true
      )

      .filter((item) =>
        category ? item.category === category : true
      );
  }, [
    items,
    createdItems,
    sort,
    searchQuery,
    priceRange,
    rating,
    category,
  ]);

  const resetFilters = () => {
    setSort("");
    setSearchQuery("");
    setPriceRange(DEFAULT_PRICE);
    setRating(0);
    setCategory("");
  };

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <h3>Фильтры</h3>

        <ItemsSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск"
        />

        <CardSelect
          value={sort}
          onChange={setSort}
          defaultValue="Все товары"
          options={[
            { value: "isPremium", name: "Премиум" },
            { value: "!isPremium", name: "Обычные" },
          ]}
        />

        <PriceFilter
          min={0}
          max={1000}
          value={priceRange}
          onChange={setPriceRange}
        />

        <RatingFilter
          value={rating}
          onChange={setRating}
        />

        <CategoryFilter
          value={category}
          onChange={setCategory}
          categories={categories}
        />

        <button
          className={styles.reset}
          onClick={resetFilters}
        >
          Очистить фильтры
        </button>
      </div>

      {/* PRODUCTS */}
      <div className={styles.products}>
        <h3>Товары ({filteredItems.length})</h3>

        <div className={styles.list}>
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              {...item}
              onAddToCart={counterInc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};