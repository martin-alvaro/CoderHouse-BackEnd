const socketClient = io();

document.getElementById('createProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const description = form.description.value;
  const code = form.code.value;
  const price = parseFloat(form.price.value);
  const stock = parseInt(form.stock.value);
  const category = form.category.value;
  const thumbnails = form.thumbnails.value;

  socketClient.emit('createProduct', {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  });

  form.reset();
});

document.getElementById('deleteProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const productId = parseInt(form.productId.value);

  socketClient.emit('deleteProduct', productId);

  form.reset();
});

socketClient.on('newProduct', (newProduct) => {
  const productListContainer = document.querySelector('.cont-prod');

  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.innerHTML = `
    <img src="${newProduct.thumbnails}" alt="${newProduct.title}">
    <h2>${newProduct.title}</h2>
    <p>${newProduct.description}</p>
    <p>$${newProduct.price}</p>
    <p>Cantidad: ${newProduct.stock}</p>
  `;

  productListContainer.appendChild(productElement);
});

socketClient.on('productDeleted', () => {
  location.reload();
});

socketClient.on('saludoDesdeBack', (message) => {
  console.log('Saludo desde el servidor:', message);
});
