const fetchProducts = async (product) => {
  if (typeof product === 'undefined') {
    return Promise.reject(new Error('You must provide an url'));
  }
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(endPoint);
  const { results } = await response.json();
  
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
