import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function TopSales() {
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const { data } = await response.json();
        const topProducts = [
          data.products[0],
          data.products[12],
          data.products[20],
          data.products[24],
        ].filter((item) => item !== undefined);
        setProductList(topProducts);
        console.log(topProducts);
      } catch (error) {
        setProductList(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-5 py-20 bg-gray-200">
      <span className="text-sm text-orange-500">COLECCIÓN</span>
      <h2 className="text-3xl font-bold text-gray-800">Los más buscados</h2>
      <div className="md:grid grid-cols-2 gap-10">
        {productList ? (
          <ProductCard product={productList[0]} i="2"></ProductCard>
        ) : (
          "ups"
        )}
        {productList ? (
          <ProductCard product={productList[1]} i="2"></ProductCard>
        ) : (
          "ups"
        )}
        {productList ? (
          <ProductCard product={productList[2]} i="1"></ProductCard>
        ) : (
          "ups"
        )}
        {productList ? (
          <ProductCard product={productList[3]} i="0"></ProductCard>
        ) : (
          "ups"
        )}
      </div>
    </section>
  );
}
