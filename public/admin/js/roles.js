const tablePermissions = document.querySelector("[table-permissions]")
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]")

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];

    const rows = tablePermissions.querySelectorAll("[data-name]")

    rows.forEach(row => {
      const name = row.getAttribute("data-name")
      const inputs = row.querySelector("input")

    })

  })
}