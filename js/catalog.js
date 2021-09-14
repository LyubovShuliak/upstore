import { bookList as oldBookList } from "./constants/bookList.js";
let current_page = 1;

const cardList = document.querySelector(".card-list");

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".modal");
  let options = [{ startingTop: "20%" }];

  let instances = M.Modal.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".sidenav");
  let options = [];
  let instances = M.Sidenav.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".sidenav");
  let options = [];
  let instances = M.Sidenav.init(elems, options);
});

const saveBtn = document.querySelector(".save_input");

let cartItems = localStorage.getItem("bookInCart");
const parseCartItems = JSON.parse(cartItems) || [];
function createBookList(list) {
  return oldBookList.map((item) => {
    const existInStorage = list.find((elem) => elem.id === item.id);

    if (existInStorage) return existInStorage;

    return item;
  });
}

const bookList = createBookList(parseCartItems);
console.log(bookList);

function addToCart(eventClick, book) {
  const quantityP = cardList.querySelector(`a[data-book-id="${book.id}"]`);
  let quantity = null;
  let inCart = null;
  let newLocalStorage = null;
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
      newLocalStorage = [...cartItems, { ...book, quantity, inCart: inCart }];
    }
  }
  const buyBtn = eventClick.target;
  const buyAdd = cardList.querySelector(`a[data-book-buy="${book.id}"]`);
  if (newLocalStorage) {
    if (quantity > 0) {
      localStorage.setItem("bookInCart", JSON.stringify(newLocalStorage));
      quantityP.innerHTML = `Available`;
      countBookInCart(newLocalStorage);
    } else if (quantity === 0) {
      localStorage.setItem("bookInCart", JSON.stringify(newLocalStorage));
      buyBtn.classList.add("disabled_btn");
      buyAdd.classList.add("disabled_btn");
      quantityP.innerHTML = "Not available";
      quantityP.classList.add("disabled", "btn");
      countBookInCart(newLocalStorage);
    } else {
      buyBtn.classList.add("disabled_btn");
      buyAdd.classList.add("disabled_btn");
      quantityP.innerHTML = `Not available`;
      quantityP.classList.add("disabled", "btn");
    }
  }
  totalCost(book);
  cartNumbers(book);
}

// -------------------Sort------------------------------------------
let sortBtn = document.querySelector("#less");
sortBtn.addEventListener("click", () => {
  sort(bookList);
});
function sort(books) {
  books.sort((a, b) => a.price - b.price);

  displayCatalog(books, current_page);
  SetupPagination(books, pagination_elements);
}
// -------------------Sort-----------------------------------------
let sortLess = document.querySelector("#more");
sortLess.addEventListener("click", () => {
  bookList.sort((a, b) => b.price - a.price);

  displayCatalog(bookList, current_page);
  SetupPagination(bookList, pagination_elements);
});
saveBtn.addEventListener("click", () => {
  let inputVal = document.querySelector(".text_input").value;
  let carrent = cardList.children

  if (!inputVal) {
    cardList.appendChild(carrent)
    
  } else {
    let current_page = 1
    let searchResults = document.querySelector(".bread")
    let search =document.createElement("A")
    search.classList.add("breadcrumb")
    search.innerHTML = "Search results"
    searchResults.appendChild(search)
  
    let bookList_filtered = bookList.filter((book) => {
      if (book.author.includes(inputVal)) {
        return true;
      } else {
        return false;
      }
    });

    cardList.innerHTML = "";
    displayCatalog(bookList_filtered, current_page);
    SetupPagination(bookList_filtered, pagination_elements);
  }
});
let breadcrumbs = document.querySelector(".breadcrumbs")
breadcrumbs.addEventListener("click", ()=>{
  let bread = document.querySelector(".bread")
  let breads = bread.querySelectorAll(".breadcrumb")
  if (breads[2] != undefined) {
    breads[2].remove()
  }
 
  displayCatalog(bookList, current_page);
  SetupPagination(bookList, pagination_elements);
})
function getSelectedCheckboxValues() {
  const filters = document.querySelector(".filters");
  const checkboxes = filters.querySelectorAll(`input[type="checkbox"]`);
  const checkboxesChecked = filters.querySelectorAll(
    `input[type="checkbox"]:checked`
  );

  if (checkboxesChecked.length) {
    let BOOK_FILTERED = [];
    let checkBoxNames = [];

    checkboxesChecked.forEach((checkbox) => {
      if (!BOOK_FILTERED.length) {
        checkBoxNames.push(checkbox.name);
        let bookList_filtered = bookList.filter((book) => {
          let bookValues = Object.values(book);
          if (bookValues.toString().includes(checkbox.value)) {
            return true;
          } else {
            return false;
          }
        });

        displayCatalog(bookList_filtered, current_page);
        SetupPagination(bookList_filtered, pagination_elements);
      }
      if (BOOK_FILTERED.length && !checkBoxNames.includes(checkbox.name)) {
        checkBoxNames.push(checkbox.name);
        let bookList_filtered = bookList.filter((book) => {
          let bookValues = Object.values(book);
          if (bookValues.toString().includes(checkbox.value)) {
            return true;
          } else {
            return false;
          }
        });
        let fdfd = bookList_filtered.filter((item) => {
          if (BOOK_FILTERED.includes(item)) {
            return true;
          } else {
            return false;
          }
        });
      }
      if (BOOK_FILTERED.length && checkBoxNames.includes(checkbox.name)) {
        checkBoxNames.push(checkbox.name);
        bookList_filtered = BOOK_FILTERED.filter((book) => {
          let bookValues = Object.values(book);
          if (bookValues.toString().includes(checkbox.value)) {
            return true;
          } else {
            return false;
          }
        });

        BOOK_FILTERED = BOOK_FILTERED.concat(bookList_filtered);
      }
    });
  } else {
    displayCatalog(bookList, current_page);
    SetupPagination(bookList, pagination_elements);
  }
}
const filterCheckbox = document.querySelectorAll(".filled-in");
for (const checkbox of filterCheckbox) {
  checkbox.addEventListener("change", (e) => {
    getSelectedCheckboxValues();
    //
  });
}

// -------------------Filter------------------------------------------
function countBookInCart(list) {
  const sumInCart = list.reduce((acc, currentValue) => {
    return acc + currentValue.inCart;
  }, 0);
  if (sumInCart !== 0) {
    document.querySelector(
      ".amount-in-cart"
    ).innerHTML = `<ion-icon name="bag-handle"></ion-icon><span>${sumInCart} </span>`;
  } else {
    document.querySelector(
      ".amount-in-cart"
    ).innerHTML = `<ion-icon name="bag-handle"></ion-icon>`;
  }
}

function makeCardItem(book) {
  const quantity = book.quantity > 0 ? `Available` : "Not vailable";
  let notAvailable = book.quantity == 0 ? "disabled_btn" : "";
  let notAvailableClass = book.quantity == 0 ? "disabled btn" : "";

  if (cardList) {
    const card = ` 
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${book.image}">
         </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4"><a class="tooltipped" data-position="bottom" data-tooltip="I am a tooltip"><i class="material-icons right">more_vert</i></a>${book.title}</span>       
      <p>${book.author}</p>
      <p data-id-price="${book.id}" >	
      &#8372;${book.price}.00</p>
      <a data-book-id="${book.id}" class="quantity ${notAvailableClass} ">${quantity}</a>
        <a data-book-buy="${book.id}" class="btn halfway-fab ${notAvailable} buy">ADD TO CART </a>
          </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>Annotation</span>
      <p>${book.annotation}.</p>
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
  } else {
    localStorage.setItem("cartNumbers", 1);
  }
}

function totalCost(book) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
   if (book.inCart !=0) {
    localStorage.setItem("totalCost", cartCost + book.price*book.inCart);
   }else
   { localStorage.setItem("totalCost", cartCost + book.price);}
  } else {
    if (book.inCart !=0) {
      localStorage.setItem("totalCost", cartCost + book.price*book.inCart);
     }else
     { localStorage.setItem("totalCost", cartCost + book.price);}
    
  }
}

// ------------------------CART---------------------------------------->

function displayCart() {
  let cartItems = localStorage.getItem("bookInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");
  let total = document.querySelector(".total");
  let productContainer = document.querySelector(".books");
  let cart = document.querySelector("#modal2");
  if (cartItems != null && productContainer) {
    productContainer.innerHTML = "";
    cart.classList.add("overflow_overlay");
    cart.classList.remove("overflow_hidden");
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="col s12 m7 carts" >
          <div class="card horizontal">
       
           <p>&#8372;${item.inCart}x${item.title} = &#8372;${
        item.inCart * item.price
      }.00</p>
        
           <p> <ion-icon name="trash-sharp" data-book-remove="${
             item.id
           }"></ion-icon></p>
       
      </div>
    </div>
          
           
      `;
    });
    total.innerHTML = "";
    total.innerHTML = ` Total sum: &#8372;${cartCost}.00`;

    for (const cart of cartItems) {
      const removeBtn = document.querySelector(
        `ion-icon[data-book-remove="${cart.id}"]`
      );

      removeBtn.addEventListener("click", () => {
        const maped = cartItems.map((item) => {
          if (item.id == cart.id) {
            let quantity = cart.quantity + cart.inCart;
            return { ...item, inCart: 0, quantity: quantity };
          } else {
            return item;
          }
        });
        
        const filtered = maped.filter((item) => item.id != cart.id);
        let bookList = createBookList(maped);
        if (filtered.length != 0) {
          localStorage.setItem("bookInCart", JSON.stringify(filtered));
          delete  localStorage.totalCost
          for (const book of filtered ) {
        //  book.price =   book.price*book.inCart
        //  console.log(book.price);
            totalCost(book)
            
          }
        total.innerHTML = "";
        total.innerHTML = ` Total sum: &#8372;${cartCost}.00`;

          countBookInCart(filtered);
          displayCart();
        } else {
          countBookInCart(filtered);
          let cart = document.querySelector("#modal2");
          cart.classList.add("overflow_hidden");
          cart.classList.remove("overflow_overlay");
          productContainer.innerHTML = `<tr class= "empty_cart"><td>Cart is empty</td>
          </tr>`;
          localStorage.removeItem("bookInCart");
          localStorage.removeItem("totalCost");
          localStorage.removeItem("cartNumbers");
          total.innerHTML = "";
         
          displayCatalog(bookList, current_page);
          SetupPagination(bookList, pagination_elements);
        }
      });
    }
  } else {
    cart.classList.add("overflow_hidden");
    cart.classList.remove("overflow_overlay");
    productContainer.innerHTML = `<tr class= "empty_cart"><td>Cart is empty</td>
    </tr>`;
    localStorage.removeItem("bookInCart");
  }
}

const cartButton = document.querySelector(".cart");
cartButton.addEventListener("click", () => {
  displayCart();
});

// ------------------------CART---------------------------------------->
let cart = document.querySelector("#modal2");

displayCart();
// ------------------------CART---------------------------------------->
countBookInCart(bookList);

const pagination_elements = document.getElementById("pagination");

function displayCatalog(items, page) {
  cardList.innerHTML = "";

  page--;

  let start = 4 * page;
  let end = start + 4;
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    (async () => {
      await makeCardItem(item);

      const buyBtn = cardList.querySelector(`a[data-book-buy="${item.id}"]`);
      buyBtn.addEventListener("click", (e) => addToCart(e, item));
    })();
  }
}

function SetupPagination(items, cardList) {
  cardList.innerHTML = "";

  let page_count = Math.ceil(items.length / 4);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    cardList.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    displayCatalog(items, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

displayCatalog(bookList, current_page);
SetupPagination(bookList, pagination_elements);
