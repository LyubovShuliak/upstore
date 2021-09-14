

function onloadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart").textContent = productNumbers;
  }
}
onloadCartNumbers();
