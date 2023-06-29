let items_list = document.querySelector(".Items-list")
if (document.title.includes("مصروف")) {
  items_list.querySelectorAll("a")[4].classList.add("hoverd")
} else if (document.title.includes("ايراد")) {
  items_list.querySelectorAll("a")[5].classList.add("hoverd")
}
let pages = document.querySelector(".pages")
pages.querySelectorAll("a")[1].classList.add("hoverd")


function fetches() {
  let selectName = ""
  if (document.title.includes("مصروف")) { selectName = Expenses_URL }
  else if (document.title.includes("ايراد")) { selectName = Revenues_URL }

  fetch(selectName)
    .then((response) => response.json())
    .then((row) => {
      let element = "";
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        element += `<option value="${colum[1]}">${colum[1]}</option>`
      }
      document.querySelector(".nameCustomer").innerHTML += element
    })

  fetch(General_URL)
    .then((response) => response.json())
    .then((row) => {
      localStorage.removeItem("account")
      let account = []
      let colum = "";
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        if (document.title.includes("مصروف")) {
          if (colum[4] === "المصروفات") {
            let obj = { nu: colum[0], date: colum[1], statement: colum[3], name: colum[6], amountdebit: colum[8], amountcredit: 0, balance: colum[15] }
            account.push(obj)
          }
        }
        else if (document.title.includes("ايراد")) {
          if (colum[5] === "الايرادات") {
            let obj = { nu: colum[0], date: colum[1], statement: colum[3], name: colum[7], amountdebit: 0, amountcredit: colum[9], balance: colum[16] }
            account.push(obj)
          }
        }
        localStorage.setItem("account", JSON.stringify(account))
      }
      showData()
    })
}; fetches()

function showData() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  let totalAll = 0;
  for (let i = 0; i < account.length; i++) {
    element += `
                <tr>
                  <td >${account[i].nu}</td>
                  <td >${account[i].date}</td>
                  <td >${account[i].name}</td>
                  <td >${account[i].statement}</td>
                  <td >${account[i].amountdebit}</td>
                  <td >${account[i].amountcredit}</td>
                  <td >${account[i].balance}</td>
                </tr>`
    totalAll = totalAll + account[i].amountdebit - account[i].amountcredit
  }
  document.querySelector(".table-body").innerHTML = element
  document.querySelector("table").style.display = "table"
  document.querySelector(".loader").classList.add("Done")

  // document.querySelector(".totalAllExpenses").innerHTML = "اجمالى المصروفات " + totalAll


}

function Search() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }

  let value = document.querySelector(".nameCustomer").value
  let SDate = document.querySelector(".SDate").value
  let EDate = document.querySelector(".EDate").value

  let nextYear = new Date().getFullYear() + 1
  if (SDate === "") { SDate = "01-01-1997" }
  if (EDate === "") { EDate = nextYear + "-01-01" }
  if (value == "اسم المصروف") { value = "" }

  let element = "";
  for (let i = 0; i < account.length; i++) {
    if (account[i].date >= SDate && account[i].date <= EDate && account[i].name.includes(value)) {
      element += `
              <tr>
                  <td >${account[i].nu}</td>
                  <td >${account[i].date}</td>
                  <td >${account[i].name}</td>
                  <td >${account[i].statement}</td>
                  <td >${account[i].amountdebit}</td>
                  <td >${account[i].amountcredit}</td>
                  <td >${account[i].balance}</td>
              </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}
