const getAllProductsQuery = `SELECT v.id, p.name, v.color, v.slug, s.name AS category, p.price, p.short_description AS short, p.description, p.feature_1, p.feature_2, p.feature_3, p.specs, v.photos
FROM product AS p
JOIN category_secondary AS s
ON s.id = p.category_id
JOIN product_variant AS v
ON p.id = v.product_id`;

export { getAllProductsQuery };
