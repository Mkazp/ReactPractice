import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Headerlist from '../../widgets/header/headerList'
import { ProductDetails } from "../../widgets/product-details/ProductDetails";

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

export const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("/data/items.json");
      const data = await res.json();

      const found = data.products.find(
        (item: Product) => item.id === Number(id)
      );

      setProduct(found);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
        <Headerlist/>
        <ProductDetails product={product} />
    </>

);
};