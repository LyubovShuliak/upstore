function onloadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
      document.querySelector(".cart span").textContent = productNumbers;
    }
  }
  
  onloadCartNumbers()