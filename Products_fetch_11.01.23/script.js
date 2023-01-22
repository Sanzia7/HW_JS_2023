const posts = document.querySelector('#products');
const add_form = document.querySelector('.add_form');


function createPost(id, title, price, description, category, image, rating) {
   const title_p = document.createElement('p');
   const price_p = document.createElement('p');
   const description_p = document.createElement('p');
   const category_p = document.createElement('p');
   const image_el = document.createElement('img');
   const rate_p = document.createElement('p');
   const count_p = document.createElement('p');
   const container = document.createElement('div');

   const deleteButton = document.createElement('button');
   deleteButton.innerText = 'Delete';

   title_p.innerText = title;
   price_p.innerText = price;
   description_p.innerText = description;
   category_p.innerText = category;
   image_el.src = image;
   rate_p.innerText = rating.rate;
   count_p.innerText = rating.count;
   container.classList.add(`product`);
   container.id = id;
   title_p.classList.add('subheader')
   deleteButton.classList.add('delete');

   container.append(title_p, price_p, description_p, category_p, image_el, rate_p, count_p, deleteButton);
   products.append(container);

   deleteButton.addEventListener("click", () => {
      container.remove();
   });
}

add_form.addEventListener('submit', event => {
   event.preventDefault()
   const id = event.target.id.value;

   fetch(`https://fakestoreapi.com/products/${id}`)//интерполяция запроса по соответвующему id
      .then(resp => resp.json())
      .then(({ id, title, price, description, category, image, rating }) => createPost(id, title, price, description, category, image, rating))
   // console.log(id)
   event.target.id.value = '';
})

function sendPost(title, price, description, category, image, rating) {
   fetch('https://fakestoreapi.com/products/', {
      method: 'POST',
      body: JSON.stringify({ title, price, description, category, image, rating }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then(({ id, title, price, description, category, image, rating }) => createPost(id, title, price, description, category, image, rating));
}


