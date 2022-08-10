const fetchItem = async (productId) => {
  if (typeof productId === 'undefined') {
    return Promise.reject(new Error('You must provide an url'));
  }
  const endPoint = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(endPoint);
  const product = await response.json();

  return product;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
