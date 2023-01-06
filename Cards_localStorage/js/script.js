// First level: необходимо реализовать страницу, которая получает данные о товаре и выводит информационные карточки с товарами.

// В нижней части страницы должен быть расчет общей суммы. 
//Результат должен выглядеть приблизительно как на макете https://www.figma.com/file/wRonUTYoOVL3ii4meCtdzR/Untitled?node-id=1%3A2&t=5i8ANTCkEpFzMpoi-0

// let products = [
//    {
//       id: 1,
//       title: 'Bicycle',
//       price: 4500,
//       quantity: 5,
//       amount: 5 * 4500,
//    },
//    {
//       id: 2,
//       title: 'Roller',
//       price: 2500,
//       quantity: 7,
//       amount: 7 * 2500,
//    },
//    {
//       id: 3,
//       title: 'Scooter',
//       price: 1500,
//       quantity: 10,
//       amount: 10 * 1500,
//    },
// ];

function addToLocal(products) {
   localStorage.setItem('products', JSON.stringify(products))
};

function getFromLocal() {
   return JSON.parse(localStorage.getItem('products')) ?? [];
}

let products = getFromLocal()

const form = document.querySelector('.add_form');
const productsContainer = document.querySelector('.products');

form.addEventListener('submit', (event) => {
   event.preventDefault();

   const id = Date.now();
   const title = event.target.title.value;
   const price = +event.target.price.value;
   const quantity = +event.target.quantity.value;
   const amount = +event.target.amount.value;
   
   products = [...getFromLocal(), { id, title, price, quantity, amount }]
   addToLocal(products)
   // addToLocal([...getFromLocal(), { id, title, price, quantity, amount }])

   event.target.title.value = '';
   event.target.price.value = '';
   event.target.quantity.value = '';
   event.target.amount.value = '';

   rerender();
});

function deleteProduct(id) {
   const new_products = getFromLocal().filter(product => product.id !== id)
   addToLocal(new_products)
   rerender();
};

function createProductCard(id, title, price, quantity, total) {
   const containerCard = document.createElement('div');
   const title_p = document.createElement('p');
   const price_p = document.createElement('p');
   const quantity_p = document.createElement('p');
   const total_p = document.createElement('p');
   const delete_btn = document.createElement('button');

   containerCard.classList.add('product');

   title_p.innerText = title;
   price_p.innerText = price;
   quantity_p.innerText = quantity;
   total_p.innerText = `Total price: ${price} * ${quantity} = ${price * quantity}`;
   delete_btn.innerText = 'Delete';

   delete_btn.addEventListener('click', () => {
      deleteProduct(id);
   })

   containerCard.append(title_p, price_p, quantity_p, total_p, delete_btn);
   return containerCard
}


function rerender() {
   productsContainer.innerText = '';

   if (getFromLocal().length === 0) {
      const info = document.createElement('p');
      info.innerText = 'There are no products';
      productsContainer.append(info);
   } else {
      getFromLocal().forEach(({ id, title, price, quantity, total}) => {
         const newProduct = createProductCard(id, title, price, quantity, total);
         productsContainer.append(newProduct);
      })
   }

   const total_amount = products.reduce((prev, { quantity }) => prev + quantity, 0);
   const total_price = products.reduce((prev, { price, quantity }) => prev + price * quantity, 0);

   const total_amount_elem = document.querySelector('.order_info .total_amount');
   const total_price_elem = document.querySelector('.order_info .total_price');

   total_amount_elem.innerText = total_amount;
   total_price_elem.innerText = total_price;
};
rerender();
