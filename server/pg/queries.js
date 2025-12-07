const getAllProductsQuery = `SELECT p.name, p.slug, p.price, p.description, p.feature_1, p.feature_2, p.feature_3, p.specs, v.photos
FROM product AS p
JOIN product_variant AS v
ON p.id = v.product_id`;

export { getAllProductsQuery };
