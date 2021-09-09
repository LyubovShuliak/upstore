function displayCart() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".books");
    console.log(productContainer);
    if (cartItems && productContainer) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
        <div class="book">
      <ion-icon name="close-circle-outline"></ion-icon>
      <img src="${item.image}" alt="" >
      <span>${item.title}</span>
  </div>
        `;
      });
    }
  }
  
  
  displayCart();