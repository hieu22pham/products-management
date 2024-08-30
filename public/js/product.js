const cartOutOfStock = document.querySelector("[btn-cart-outOfStock]")
if (cartOutOfStock) {

}

const buttonsGoBack = document.querySelectorAll("[button-go-back]")
if (buttonsGoBack.length > 0) {
  buttonsGoBack.forEach(button => {
    button.addEventListener("click", () => {
      history.back()
    })
  });
}