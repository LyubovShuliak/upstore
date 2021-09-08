const search_icon = document.querySelector(".search_icon");

search_icon.onclick = function () {
  showSearchBar();
};

function showSearchBar() {
  document.querySelector(".text").classList.toggle("show");
}

let bookList = [
  {
    image: "./assets/images/Product images/ark.jpg",
    title: "Тріумфальна арка",
    author: "Еріх Марія Ремарк",
    price: 100,
    quantity: 0,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/cafe.jpg",
    title: "Кафе на краю світу",
    author: "Джон П. Стерлекі",
    price: 269,
    quantity: 10,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/city.jpg",
    title: "Місто дівчат",
    author: "Елізабет Гілберт",
    price: 178,
    quantity: 3,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/gal.jpg",
    title: "Чайка на ім`я Джонатан Лівінгстон",
    author: " Річард Бах",
    price: 118,
    quantity: 2,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/god.jpg",
    title: "Бог завжди подорожує інкогніто",
    author: "Лоран Гунель",
    price: 400,
    quantity: 6,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/head.jpg",
    title: "#Галябезголови",
    author: "Люко Дашвар",
    price: 279,
    quantity: 3,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/master.jpg",
    title: "Володар мух",
    author: "Вільям Ґолдінґ",
    price: 157,
    quantity: 9,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/one.jpg",
    title: "The one",
    author: "Джон Маррс",
    price: 240,
    quantity: 9,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/parfumer.jpg",
    title: "Парфюмер",
    author: "Патрік Зюскінд",
    price: 170,
    quantity: 9,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/patient.jpg",
    title: "Безмовний паціент",
    author: "Алекс Міхаелідес",
    price: 160,
    quantity: 20,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/people.jpg",
    title: "Тревожные люди",
    author: "Фредрік Бакман",
    price: 65,
    quantity: 11,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/Tiffani.jpg",
    title: "Завтрак у Тиффани",
    author: "Трумен Капоте",
    price: 128,
    quantity: 9,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/trans.jpg",
    title: "Transhumanism Inc.",
    author: "Віктор  Пелевін",
    price: 267,

    quantity: 9,
    inCart: 0,
  },
  {
    image: "./assets/images/Product images/wait.png",
    title: "Чекай удома, коли повернуся",
    author: "Ельчін Сафарлі",
    price: 170,
    quantity: 15,
    inCart: 0,
  },
];

function displayCatalog() {
  let books = document.querySelector(".card-list");

  if (books) {
    bookList.map((book) => {
      makeCardItem(book);
    });
  }
  let carts = document.querySelectorAll(".buy");
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(bookList[i]);
      totalCost(bookList[i]);
    });
  }
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
          <a class="btn-floating halfway-fab waves-effect waves-light red buy"><i class="material-icons">Buy</i></a>
        </div>
        <div class="card-content">
          <p>${book.title}</p>
          <p>&#8372;${book.price}.00</p>
          <p class = "quantity">Доступно ${book.quantity} примірників</p>
        </div>
      </div>
    </div>
  </div>
           
  
    `;
  }
  console.log(book.quantity);

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
