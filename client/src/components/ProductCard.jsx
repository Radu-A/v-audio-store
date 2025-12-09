import { ShoppingCart } from "lucide-react";

ShoppingCart;

export default function ProductCard({ product, i }) {
  const photoURL = `https://res.cloudinary.com/ds9uwjcs7/image/upload/w_400/v1764931470/${product.photos[i]}.png`;
  return (
    <article className="rounded-4xl overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="relative overflow-hidden">
        <img
          src={photoURL}
          alt={product.category}
          className="w-full aspect-4/3 object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
        />
        <button className="absolute right-4 bottom-4 p-3 rounded-full bg-white cursor-pointer">
          <ShoppingCart size={20} />
        </button>
      </div>
      <div className="p-6 bg-white">
        <span className="text-xs">{product.category.toUpperCase()}</span>
        <h3 className="font-bold text-black">{product.name}</h3>
        <p className="py-4 text-sm">{product.short}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-black">{product.price} €</h3>
          <a
            href=""
            className="text-xs font-medium group-hover:text-orange-500 transition-all duration-300 ease-in-out"
          >
            Ver detalles
          </a>
        </div>
      </div>
    </article>
  );
}
