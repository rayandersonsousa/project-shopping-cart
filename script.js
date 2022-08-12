const sectionItems = document.querySelector('.items');
const sectionCart = document.querySelector('.cart__items');
const btnEmptyCart = document.querySelector('.empty-cart');
const totalValueCart = document.querySelector('.total-price');

const totalValue = () => {
  const itemsInCart = sectionCart.children;
  let finalTotalValue = 0;
  let sumValue = 0;
  if (itemsInCart.length > 0) {
    for (index = 0; index < itemsInCart.length; index += 1) {
      const myArray = itemsInCart[index].innerText.split('$');
      const currValue = parseFloat(myArray[1]);
      sumValue += currValue;
      finalTotalValue = (sumValue);
    }
  }
  totalValueCart.innerText = finalTotalValue.toString();
};

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
  event.target.remove();
  totalValue();
  saveCartItems(sectionCart.innerHTML);
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

sectionItems.addEventListener('click', async (produ) => {
  const sku = getSkuFromProductItem(produ.target.parentNode);
  await addProducsToCart(sku);
  saveCartItems(sectionCart.innerHTML);
  totalValue();
});

const getLocalStorageInfo = () => {
  const getProducts = getSavedCartItems();
  if (getProducts.length > 0) {
    sectionCart.innerHTML = getProducts;
    const savedCart = sectionCart.children;
    for (let index = 0; index < savedCart.length; index += 1) {
      savedCart[index].addEventListener('click', cartItemClickListener);
    }
    totalValue();
  }
};

btnEmptyCart.addEventListener('click', () => {
  sectionCart.innerHTML = '';
  saveCartItems(sectionCart.innerHTML);
  totalValue();
});

const addLoading = () => {
  sectionItems.appendChild(createCustomElement('span', 'loading', 'carregando...'));
};

const removeLoading = () => {
  const getLoading = document.querySelector('.loading');
  getLoading.remove();
};

window.onload = async () => { 
  addLoading();
  await addProducsToPage();
  removeLoading();
  await getLocalStorageInfo();
};
