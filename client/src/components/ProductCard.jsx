export default function ProductCard({ product, i }) {
  const photoURL = `https://res.cloudinary.com/ds9uwjcs7/image/upload/w_350/v1764931470/${product.photos[i]}.png`;
  return (
    <article>
      <div className="rounded-2xl overflow-hidden">
        <img src={photoURL} alt={product.category} className="w-full" />
      </div>
      <div>
        <span>{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.short}</p>
        <div>
          <h3>{product.prize}</h3>
          <a href="">Ver detalles</a>
        </div>
      </div>
    </article>
  );
}
