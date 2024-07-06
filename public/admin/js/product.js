const buttonsChangStatus = document.querySelectorAll("[button-change-status]")

if (buttonsChangStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status")
  const path = formChangeStatus.getAttribute("data-patch")

  buttonsChangStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")

      let statusChange = statusCurrent == "active" ? "inactive" : "active"
      console.log(statusCurrent, id, statusChange)

      const action = path + `${statusChange}/${id}?_method=PATCH`
      formChangeStatus.action = action
      formChangeStatus.submit()
    })
  })
}

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")

  const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked == true) {
      inputsId.forEach(input => {
        input.checked = true
      })
    } else {
      inputsId.forEach(input => {
        input.checked = false
      })
    }
  })

  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length

      if (countChecked === inputsId.length) {
        inputCheckAll.checked = true
      } else {
        inputCheckAll.checked = false
      }
    })
  })
}
//end checkbox multi

// form change multi
const formChangMulti = document.querySelector("[form-change-multi]")
if (formChangMulti) {
  formChangMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

    const typeChange = e.target.elements.type.value
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc xóa các sản phẩm này?")

      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = []
      inputChecked.forEach(input => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value
          const string = `${id}-${position}`
          ids.push(string)
        } else {
          ids.push(id)
        }

        const ip = document.querySelector("input[name='ids']")
        ip.value = ids.join(", ")

        formChangMulti.submit();
      })
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi")
    }
  })
}
// end form change multi

// delete products
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item")

  const path = formDeleteItem.getAttribute("data-patch")

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      console.log(button)
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?")

      if (isConfirm) {
        const id = button.getAttribute("data-id")

        const action = `${path}/${id}?_method=DELETE`

        formDeleteItem.action = action
        formDeleteItem.submit()
      } else {

      }
    })
  })
}
// end delete products

// show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"))
  const closeAlert = showAlert.querySelector("[close-alert]")

  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time)

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
// end show alert


const buttonDeleteBin = document.querySelectorAll("[button-delete-bin]")
if (buttonDeleteBin.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item-bin")

  const path = formDeleteItem.getAttribute("data-patch")

  buttonDeleteBin.forEach(button => {
    button.addEventListener("click", () => {
      console.log(button)
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?")

      if (isConfirm) {
        const id = button.getAttribute("data-id-delete-bin")

        const action = `${path}/${id}?_method=DELETE`

        formDeleteItem.action = action
        formDeleteItem.submit()
      } else {

      }
    })
  })
}

const buttonRestoreBin = document.querySelectorAll("[button-restore-bin]")
if (buttonRestoreBin.length > 0) {
  const formDeleteItem = document.querySelector("#form-restore-item-bin")

  const path = formDeleteItem.getAttribute("data-patch")

  buttonRestoreBin.forEach(button => {
    button.addEventListener("click", () => {
      console.log(button)
      const isConfirm = confirm("Bạn có chắc muốn khôi phục sản phẩm này?")

      if (isConfirm) {
        const id = button.getAttribute("data-id-restore-bin")

        const action = `${path}/${id}?_method=DELETE`

        formDeleteItem.action = action
        formDeleteItem.submit()
      } else {

      }
    })
  })
}

const formChangMultiBin = document.querySelector("[form-change-multi-bin]")
if (formChangMultiBin) {
  formChangMultiBin.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputCheckedBin = checkboxMulti.querySelectorAll("input[name='id-bin']:checked")

    const typeChange = e.target.elements.type.value
    if (typeChange == "delete-all-vv") {
      const isConfirm = confirm("Bạn có chắc xóa các sản phẩm này?")

      if (!isConfirm) {
        return;
      }
    }

    if (inputCheckedBin.length > 0) {
      console.log("Ok")
      let ids = []
      inputCheckedBin.forEach(input => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value
          const string = `${id}-${position}`
          ids.push(string)
        } else {
          ids.push(id)
        }

        const ip = document.querySelector("input[name='idsbin']")
        ip.value = ids.join(", ")
        console.log(ip)

        formChangMultiBin.submit();
      })
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi")
    }
  })
}

const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  console.log(uploadImageInput)
  const uploadImagePreview = document.querySelector("[upload-image-preview]")

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}

//sort
const sort = document.querySelector("[sort]")
if (sort) {
  let url = new URL(window.location.href)
  const sortSelect = sort.querySelector("[sort-select]")

  const sortClear = sort.querySelector("[sort-clear]")

  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value
    console.log(value)
    const [sortKey, sortValue] = value.split("-")

    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)

    window.location.href = url.href
  })

}
//end sort
