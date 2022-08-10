const sectionItems = document.querySelector('.items');
const sectionCart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const itemInCart = event.target;
  sectionCart.removeChild(itemInCart);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const addProducsToPage = async () => {
  const response = await fetchProducts('computador');
  response.forEach((element) => {
    const myObject = { sku: element.id, name: element.title, image: element.thumbnail };
    const item = createProductItemElement(myObject);
    sectionItems.appendChild(item);
  });
};

const addProducsToCart = async (producId) => {
  const selectProduct = await fetchItem(producId);
  const { id, title, price } = selectProduct;
  const productObject = { sku: id, name: title, salePrice: price };
  const cartItem = createCartItemElement(productObject);
  sectionCart.appendChild(cartItem);
};

sectionItems.addEventListener('click', (produ) => {
  const sku = getSkuFromProductItem(produ.target.parentNode);
  addProducsToCart(sku);
});

window.onload = () => { addProducsToPage(); putInCart(); };
