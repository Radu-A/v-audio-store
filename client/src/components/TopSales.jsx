import { useEffect, useState } from "react";

export default function TopSales() {
  const [productList, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        console.log(data);

        setProducts(data);
      } catch (error) {
        setProducts(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="p-5 bg-gray-50">
      <h2>Top Ventas</h2>
      {productList
        ? productList.map((product) => {
            return product.name;
          })
        : "caca"}
    </section>
  );
}
