// prettier-ignore

export async function getCategories() {
  const fetchAPI = await fetch(
    'https://api.mercadolibre.com/sites/MLB/categories',
  );
  const data = await fetchAPI.json();
  console.log(data);
  return data;
}
// prettier-ignore

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const fetchAPI = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`,
  );
  const data = await fetchAPI.json();
  return data;
}
