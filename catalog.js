import { bookList as oldBookList } from "./constants/bookList.js";

const search_icon = document.querySelector(".search_icon");


search_icon.onclick = function () {
  showSearchBar();
};

function showSearchBar() {
  document.querySelector(".text").classList.toggle("show");
}
let sortBtn = document.querySelector(".sort")
sortBtn.addEventListener("click",() =>{
 
 }
 )


let cartItems = localStorage.getItem("bookInCart");
const parseCartItems = JSON.parse(cartItems) || [];

const bookList = oldBookList.map((item) => {
  const existInStorage = parseCartItems.find((elem) => elem.id === item.id);

  if (existInStorage) return existInStorage;

  return item;
});

countBookInCart(bookList);
function displayCatalog() {
  const cardList = document.querySelector(".card-list");

  for (const book of bookList) {
    (async () => {
      await makeCardItem(book);
      const buyBtn = cardList.querySelector(`a[data-book-buy="${book.id}"]`);
      const quantityP = cardList.querySelector(`p[data-book-id="${book.id}"]`);
      const price = cardList.querySelector(`p[data-id-price="${book.id}"]`);

      let quantity = null;
      let inCart = null;
      let newLocalStorage = null;
      buyBtn.addEventListener("click", (e) => {
        let cartItems = localStorage.getItem("bookInCart");
        cartItems = JSON.parse(cartItems);

        if (!cartItems) {
          quantity = book.quantity - 1;
          inCart = book.inCart + 1;
          if (quantity < 0) return;

          newLocalStorage = [
            {
              ...book,
              quantity: quantity,
              inCart: inCart,
            },
          ];
        } else {
          const bookExistInCart = cartItems.find((item) => item.id === book.id);

          if (bookExistInCart) {
            quantity = bookExistInCart.quantity - 1;
            inCart = bookExistInCart.inCart + 1;
            if (quantity < 0) return;

            newLocalStorage = cartItems.map((storageBook) => {
              if (storageBook.id === bookExistInCart.id) {
                return {
                  ...bookExistInCart,
                  quantity: quantity,
                  inCart: inCart,
                };
              }
              return storageBook;
            });
          } else {
            quantity = book.quantity - 1;
            inCart = book.inCart + 1;

            if (quantity < 0) return;

            newLocalStorage = [
              ...cartItems,
              { ...book, quantity, inCart: inCart },
            ];
          }
        }

        if (newLocalStorage) {
          if (quantity != 0) {
            localStorage.setItem("bookInCart", JSON.stringify(newLocalStorage));
            quantityP.innerHTML = `Доступно ${quantity} примірників`;
            countBookInCart(newLocalStorage);
          } else {
            price.classList.add("disabled");
            buyBtn.classList.add("disabled");
            quantityP.innerHTML = `Недоступно`;
          }
        }
        totalCost(book);
        cartNumbers(book);
      });
    })();
  }
}

function countBookInCart(list) {
  const sumInCart = list.reduce((acc, currentValue) => {
    return acc + currentValue.inCart;
  }, 0);

  document.querySelector(".amount-in-cart").innerHTML = sumInCart;
}

function makeCardItem(book) {
  const cardList = document.querySelector(".card-list");
  if (cardList) {
    const card = ` 
      <div class="row">
        <div class="col s12 m6 ">
          <div class="card">
            <div data-id-button="${book.id}" class="card-image">
              <img src="${book.image}">
              <a data-book-buy="${book.id}" class="btn-floating halfway-fab waves-effect waves-light red buy"><i class="material-icons">Buy</i></a>
            </div>
            <div class="card-content">
              <p>${book.title}</p>
              <p data-id-price="${book.id}">&#8372;${book.price}.00</p>
              <p data-book-id="${book.id}" class="quantity">Доступно ${book.quantity} примірників</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const prevContent = cardList.innerHTML;
    cardList.innerHTML = prevContent + card;
  }
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

displayCatalog();
