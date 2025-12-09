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
          data.products[14],
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
    <section className="px-8 py-20 bg-gray-100">
      <span className="text-sm text-orange-500">COLECCIÓN</span>
      <h2 className="text-3xl font-bold text-gray-800">Los más buscados</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="flex justify-center items-center p-8">
        <a className="relative font-medium text-black after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1.5px] after:content-[''] after:bg-black cursor-pointer hover:font-bold">
          Ver todo el catálogo &rarr;
        </a>
      </div>
    </section>
  );
}
