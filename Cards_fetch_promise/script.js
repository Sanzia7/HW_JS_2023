const posts = document.querySelector('#products')
const add_form = document.querySelector('.add_form')


function createPost(title, price, description, category, image, rating) {
   const title_p = document.createElement('p')
   const price_p = document.createElement('p')
   const description_p = document.createElement('p')
   const category_p = document.createElement('p')
   const image_el = document.createElement('p')
   const rating_p = document.createElement('p')
   const container = document.createElement('div')

   title_p.innerText = title
   price_p.innerText = price
   description_p.innerText = description
   category_p.innerText = category
   image_el.innerText = image
   image_el.innerText = `"image":"url.(/img.jpg)"`
   rating_p.innerText = rating
   //rating = `rating: ${rate}, count: ${count}`
   container.classList.add('product')
   title_p.classList.add('subheader')

   container.append(title_p, price_p, description_p, category_p, image_el, rating_p)
   products.append(container)
}

add_form.addEventListener('submit', event => {
   event.preventDefault()
   const id = event.target.id.value

   fetch(`https://fakestoreapi.com/products/${id}`)//интерполяция запроса по соответвующему id
      .then(resp => resp.json())
      .then(({ title, price, description, category, image, rating }) => createPost(title, price, description, category, image, rating))
   // console.log(id)
   event.target.id.value = ''
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
      .then(({ title, price, description, category, image, rating }) => createPost(title, price, description, category, image, rating));
}