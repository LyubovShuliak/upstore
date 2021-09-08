const search_icon = document.querySelector(".search_icon");

search_icon.onclick = function () {
  showSearchBar();
};

function showSearchBar() {
  document.querySelector(".text").classList.toggle("show");
}

let oldBookList = [
  {
    image: "./assets/images/Product images/ark.jpg",
    title: "Тріумфальна арка",
    author: "Еріх Марія Ремарк",
    price: 100,
    quantity: 0,
    inCart: 0,
    id: 1,
  },
  {
    image: "./assets/images/Product images/cafe.jpg",
    title: "Кафе на краю світу",
    author: "Джон П. Стерлекі",
    price: 269,
    quantity: 10,
    inCart: 0,
    id: 2,
  },
  {
    image: "./assets/images/Product images/city.jpg",
    title: "Місто дівчат",
    author: "Елізабет Гілберт",
    price: 178,
    quantity: 3,
    inCart: 0,
    id: 3,
  },
  {
    image: "./assets/images/Product images/gal.jpg",
    title: "Чайка на ім`я Джонатан Лівінгстон",
    author: " Річард Бах",
    price: 118,
    quantity: 2,
    inCart: 0,
    id: 4,
  },
  {
    image: "./assets/images/Product images/god.jpg",
    title: "Бог завжди подорожує інкогніто",
    author: "Лоран Гунель",
    price: 400,
    quantity: 6,
    inCart: 0,
    id: 5,
  },
  {
    image: "./assets/images/Product images/head.jpg",
    title: "#Галябезголови",
    author: "Люко Дашвар",
    price: 279,
    quantity: 3,
    inCart: 0,
    id: 6,
  },
  {
    image: "./assets/images/Product images/master.jpg",
    title: "Володар мух",
    author: "Вільям Ґолдінґ",
    price: 157,
    quantity: 9,
    inCart: 0,
    id: 7,
  },
  {
    image: "./assets/images/Product images/one.jpg",
    title: "The one",
    author: "Джон Маррс",
    price: 240,
    quantity: 9,
    inCart: 0,
    id: 8,
  },
  {
    image: "./assets/images/Product images/parfumer.jpg",
    title: "Парфюмер",
    author: "Патрік Зюскінд",
    price: 170,
    quantity: 9,
    inCart: 0,
    id: 9,
  },
  {
    image: "./assets/images/Product images/patient.jpg",
    title: "Безмовний паціент",
    author: "Алекс Міхаелідес",
    price: 160,
    quantity: 20,
    inCart: 0,
    id: 10,
  },
  {
    image: "./assets/images/Product images/people.jpg",
    title: "Тревожные люди",
    author: "Фредрік Бакман",
    price: 65,
    quantity: 11,
    inCart: 0,
    id: 11,
  },
  {
    image: "./assets/images/Product images/Tiffani.jpg",
    title: "Завтрак у Тиффани",
    author: "Трумен Капоте",
    price: 128,
    quantity: 9,
    inCart: 0,
    id: 12,
  },
  {
    image: "./assets/images/Product images/trans.jpg",
    title: "Transhumanism Inc.",
    author: "Віктор  Пелевін",
    price: 267,

    quantity: 9,
    inCart: 0,
    id: 13,
  },
  {
    image: "./assets/images/Product images/wait.png",
    title: "Чекай удома, коли повернуся",
    author: "Ельчін Сафарлі",
    price: 170,
    quantity: 15,
    inCart: 0,
    id: 14,
  },
];


let cartItems = localStorage.getItem("bookInCart");
const parseCartItems = JSON.parse(cartItems) || []

const bookList = oldBookList.map(item => {
  const existInStorage = parseCartItems.find(elem => elem.id === item.id)

  if (existInStorage) return existInStorage
  
  return item
})

function displayCatalog() {
  const cardList = document.querySelector(".card-list");

  for(const book of bookList) {
    (async () => {
      await makeCardItem(book);

      const buyBtn = cardList.querySelector(`a[data-book-buy="${book.id}"]`)
      const quantityP = cardList.querySelector(`p[data-book-id="${book.id}"]`)

      buyBtn.addEventListener('click', (e) => {
        let cartItems = localStorage.getItem("bookInCart");
        // console.log('cartItems: ', cartItems)

        cartItems = JSON.parse(cartItems);

        if (!cartItems) {
          localStorage.setItem("bookInCart", JSON.stringify([{
            ...book,
            quantity: book.quantity - 1
          }]));

          quantityP.innerHTML = `Доступно ${book.quantity - 1} примірників`
        } else {
          let newLocalStorage = null

          if (cartItems.find(item => item.id === book.id)) {
            newLocalStorage = cartItems.map(item => {
              if (item.id === book.id) {
                quantityP.innerHTML = `Доступно ${item.quantity - 1} примірників`
                return { ...book, quantity: item.quantity - 1}
              }
              return item
            })
  
          } else {
            console.log('ELE: ', )
            quantityP.innerHTML = `Доступно ${book.quantity - 1} примірників`
            newLocalStorage = [...cartItems, {...book, quantity: book.quantity - 1}]
          }

     

          localStorage.setItem('bookInCart', JSON.stringify(newLocalStorage))


        }
        // console.log('quantityP: ', quantityP)
        
        
      })
      
      // console.log('cardList.querySelector(`a[data-book-buy="${book.id}"]`): ', cardList.querySelector(`a[data-book-buy="${book.id}"]`))

    })()

  }
  
  // let carts = document.querySelectorAll(".buy");

  // for (let i = 0; i < carts.length; i++) {
  //   carts[i].addEventListener("click", () => {
  //     cartNumbers(bookList[i]);
  //     totalCost(bookList[i]);
  //   });
  // }
}

function makeCardItem(book) {
  const cardList = document.querySelector(".card-list");
  if (cardList) {
    card = ` 
      <div class="row">
        <div class="col s12 m6 ">
          <div class="card">
            <div class="card-image">
              <img src="${book.image}">
              <a data-book-buy="${book.id}" class="btn-floating halfway-fab waves-effect waves-light red buy"><i class="material-icons">Buy</i></a>
            </div>
            <div class="card-content">
              <p>${book.title}</p>
              <p>&#8372;${book.price}.00</p>
              <p data-book-id="${book.id}" class="quantity">Доступно ${book.quantity} примірників</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const prevContent = cardList.innerHTML;
  cardList.innerHTML = prevContent + card;
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productInCart");

  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < bookList.length; i++) {
    if (cartItems != null) {
      if (cartItems[product.title] == undefined && bookList) {
        cartItems = { ...cartItems, [product.title]: product };
      }
      cartItems[product.title].inCart += 1;
    } else {
      product.inCart = 1;
      cartItems = {
        [product.title]: product,
      };
    }
  }

  localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(book) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + book.price);
  } else {
    localStorage.setItem("totalCost", book.price);
  }
}

function name(params) {
  
}

displayCatalog();
