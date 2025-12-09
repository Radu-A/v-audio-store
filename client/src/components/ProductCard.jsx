import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, i }) {
  const photoURL = `https://res.cloudinary.com/ds9uwjcs7/image/upload/w_400/v1764931470/${product.photos[i]}.png`;
  return (
    <article className="group overflow-hidden rounded-4xl shadow-sm  hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="relative overflow-hidden">
        <img
          src={photoURL}
          alt={product.category}
          className="aspect-4/3 w-full object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
        />
        <button className="absolute bottom-0 right-4 p-3 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-amber-500 hover:text-white">
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
