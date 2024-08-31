//Cập nhật số lượng sản phẩm của 1 sản phẩm trong giỏ hàng
const inputsQuantity = document.querySelectorAll("input[name='quantity']")
if (inputsQuantity.length > 0) {
  inputsQuantity.forEach(input => {
    input.addEventListener("change", (e) => {
      const productId = input.getAttribute("product-id")
    })
  })
}
//Cập nhật số lượng sản phẩm của 1 sản phẩm trong giỏ hàng
