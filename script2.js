
function onloadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
      document.querySelector(".cart span").textContent = productNumbers;
    }
  }
function displayCart() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    console.log(Object.values(cartItems ));
    let productContainer = document.querySelector(".books")
  console.log(productContainer);
    if (cartItems && productContainer) {
      productContainer.innerHTML = ""
      Object.values(cartItems).map(item=>{
        productContainer.innerHTML+=`
        <div class="book">
      <ion-icon name="close-circle-outline"></ion-icon>
      <img src="assets/images/Product images/ark.jpg" alt="" >
      <span>${item.title}</span>
  </div>
        `
      })
    }
  
  }
  displayCart()