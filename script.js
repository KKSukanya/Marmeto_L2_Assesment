const tabBtns = document.querySelectorAll('.tab-btn');
const productsDivs = document.querySelectorAll('.products');

tabBtns.forEach(tabBtn => {
  tabBtn.addEventListener('click', async () => {
    const target = tabBtn.dataset.target;
    productsDivs.forEach(productsDiv => {
      productsDiv.classList.remove('active');
    });
    document.querySelector(`.${target}`).classList.add('active');
    tabBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    tabBtn.classList.add('active');

    // Fetch API
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(productCard => {
      productCard.remove();
    });

    // New product cards
    data.categories.forEach(category => {
      if (category.category_name.toLowerCase() === target.toLowerCase()) {
        category.category_products.forEach(product => {
          const productCard = createProductCard(product);
          document.querySelector(`.${target}`).appendChild(productCard);
        });
      }
    });
  });
});

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const productImg = document.createElement('img');
  productImg.src = product.image;
  productImg.alt = product.title;
  productImg.classList.add('img');

  const badgeText = product.badge_text ? document.createElement('span') : null;
  if (badgeText) {
    badgeText.classList.add('badge');
    badgeText.textContent = product.badge_text;
    productCard.appendChild(badgeText);
  }

  const productTitle = document.createElement('h3');
  productTitle.classList.add('product-title');
  productTitle.innerHTML = `<span class='only-title'>${product.title}</span> <span class = 'separator'> </span><span class ='vendor-name'>${product.vendor}</span>`;
  
  const priceDifference = product.compare_at_price - product.price;
  const discountPercentage = (priceDifference / product.compare_at_price) * 100;

  const price = document.createElement('p');
  price.classList.add('price');
  price.innerHTML = `Rs ${product.price}.00 <span class='compare-at-price'>${product.compare_at_price}.00</span> <span class ='discount'>${discountPercentage.toFixed(0)}% OFF</span>`;

  const cart = document.createElement('p');
  cart.classList.add('cart');
  cart.textContent = `Add To Cart`;

  productCard.appendChild(productImg);
  productCard.appendChild(productTitle);
  productCard.appendChild(price);
  
  productCard.appendChild(cart);
  
  return productCard;
}