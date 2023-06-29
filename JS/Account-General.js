let items_list = document.querySelector(".Items-list")
items_list.querySelectorAll("a")[6].classList.add("hoverd")


function fetches() {
  fetch(General_URL)
    .then((response) => response.json())
    .then((row) => {
      localStorage.removeItem("account")
      let account = []
      let colum = "";
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        let obj = { nu: colum[0], date: colum[1], item: colum[2], statement: colum[3],debit:colum[4],credit:colum[5],subdebit: colum[6] ,subcredit: colum[7] ,amountdebit: colum[8], amountcredit:colum[9] }
        account.push(obj)
        localStorage.setItem("account", JSON.stringify(account))
      }
      showData()
    })
}; fetches()

function showData() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  for (let i = 0; i < account.length; i++) {
    element += `
                <tr>
                  <td >${account[i].nu}</td>
                  <td >${account[i].date}</td>
                  <td >${account[i].item}</td>
                  <td >${account[i].statement}</td>
                  <td >${account[i].debit}</td>
                  <td >${account[i].credit}</td>
                  <td >${account[i].subdebit}</td>
                  <td >${account[i].subcredit}</td>
                  <td >${account[i].amountdebit}</td>
                  <td >${account[i].amountcredit}</td>
                </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
  document.querySelector(".loader").classList.add("Done")
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
  if (value == "اختار نوع العمليه") { value = "" }

  let element = "";
  for (let i = 0; i < account.length; i++) {
    if (account[i].date >= SDate && account[i].date <= EDate && account[i].statement.includes(value)
        || account[i].date >= SDate && account[i].date <= EDate && account[i].subdebit.includes(value)
        || account[i].date >= SDate && account[i].date <= EDate && account[i].subcredit.includes(value)){
      element += `
              <tr>
                  <td >${account[i].nu}</td>
                  <td >${account[i].date}</td>
                  <td >${account[i].item}</td>
                  <td >${account[i].statement}</td>
                  <td >${account[i].debit}</td>
                  <td >${account[i].credit}</td>
                  <td >${account[i].subdebit}</td>
                  <td >${account[i].subcredit}</td>
                  <td >${account[i].amountdebit}</td>
                  <td >${account[i].amountcredit}</td>
              </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}

