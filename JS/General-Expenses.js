let items_list = document.querySelector(".Items-list")
if (document.title.includes("مصروف")) {
  items_list.querySelectorAll("a")[4].classList.add("hoverd")
} else if (document.title.includes("ايراد")) {
  items_list.querySelectorAll("a")[5].classList.add("hoverd")
}
let pages = document.querySelector(".pages")
pages.querySelectorAll("a")[2].classList.add("hoverd")


function fetches() {
  let date = new Date(), yeer = date.getFullYear(), mons = date.getMonth() + 1, day = date.getDate(), fulldate
  if (mons < 10 && day < 10) { fulldate = yeer + "-0" + mons + "-0" + day }
  else if (mons > 10 && day > 10) { fulldate = yeer + "-" + mons + "-" + day }
  else if (mons > 10 && day < 10) { fulldate = yeer + "-" + mons + "-0" + day }
  else if (mons < 10 && day > 10) { fulldate = yeer + "-0" + mons + "-" + day }
  document.querySelector(".date").value = fulldate

  let selectName = ""
  if (document.title === "دفع مصروف") { selectName = Expenses_URL }
  else if (document.title === "تحصيل ايراد") { selectName = Revenues_URL }

  fetch(selectName)
    .then((response) => response.json())
    .then((row) => {
      let element = "";
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        element += `<option value="${colum[1]}">${colum[1]}</option>`
      }
      document.querySelectorAll(".nameCustomer")[0].innerHTML += element;
      document.querySelectorAll(".nameCustomer")[1].innerHTML += element;
    })

  fetch(General_URL)
    .then((response) => response.json())
    .then((row) => {
      localStorage.removeItem("account")
      let account = []
      let colum = "";
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        if (document.title === "دفع مصروف") {
          if (colum[0].includes("C")) {
            let obj = { nu: colum[0], date: colum[1], statement: colum[3], name: colum[6], amount: colum[8] }
            account.push(obj)
          }
        }
        else if (document.title === "تحصيل ايراد") {
          if (colum[0].includes("D")) {
            let obj = { nu: colum[0], date: colum[1], statement: colum[3], name: colum[7], amount: colum[9] }
            account.push(obj)
          }
        }
        localStorage.setItem("account", JSON.stringify(account))
      }
      document.querySelector("section").id = row.length + 1
      showData()

    })
}; fetches();


function showData() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  for (let i = 0; i < account.length; i++) {
    element += `
              <tr>
                <td >${account[i].nu}</td>
                <td >${account[i].date}</td>
                <td >${account[i].name}</td>
                <td >${account[i].statement}</td>
                <td >${account[i].amount}</td>
                <td >
                  <a onclick="Edit(event)" id="${account[i].nu}" class="fas fa-pen-to-square"></a>
                  <a onclick="deletevalue(id)" id="${account[i].nu}" class="fas fa-trash"></a>
                </td>
              </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
  document.querySelector("table").style.display = "table"
  document.querySelector(".loader").classList.add("Done")
}

function insert_value(id) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Insert === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let date = $(".date").val();
  let item = ""
  let statement = $(".statement").val();
  let amountdebit = $(".price").val();
  let amountcredit = $(".price").val();
  let row = document.querySelector("section").id

  let url; let nu; let debit = ""; let credit = ""; let subdebit = ""; let subcredit = ""; let name = document.querySelector(".nameCustomer").value

  if (date === "") { alert("برجاء ادخال التاريخ"); return }
  else if (name === "اسم المصروف") { alert("اختر اسم المصروف"); return }
  else if (name === "اسم الايراد") { alert("اختر اسم الايراد"); return }
  else if (amountdebit === "") { alert("برجاء ادخال المبلغ"); return }

  if (id == "debit") { debit = "المصروفات"; credit = "الصندوق"; subdebit = name; subcredit = "الصندوق", nu = '"C"'}
  else if (id == "credit") { debit = "الصندوق"; credit = "الايرادات"; subdebit = "الصندوق"; subcredit = name, nu = '"D"' }

  url = General_URL + "?row=" + row + "&date=" + date + "&nu=" + nu + "&action=insert" + "&statement=" + statement + "&debit=" + debit + "&item=" + item
    + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit + "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit;

  if (document.querySelector(".btn_save").classList.contains("update")) {
    url = General_URL + "?row=" + row + "&date=" + date + "&nu=" + nu + "&action=update" + "&statement=" + statement + "&debit=" + debit + "&item=" + item
    + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit + "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit;
  }

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

  MsgBox();
}

function Edit(event) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Edit === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let btn = event.target;
  let parent = btn.parentElement.parentElement;

  document.querySelector(".btn_save").classList.add("update")
  document.querySelectorAll("section")[0].id = btn.id
  document.querySelector(".date").value = parent.querySelectorAll("td")[1].innerText
  document.querySelector(".nameCustomer").value = parent.querySelectorAll("td")[2].innerText
  document.querySelector(".price").value = parent.querySelectorAll("td")[4].innerText
  document.querySelector(".statement").value = parent.querySelectorAll("td")[3].innerText
  window.scroll({ top: 0, behavior: 'smooth' });
}

function deletevalue(id) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Delete === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let url = General_URL + "?row=" + id + "&action=delete";
  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
  MsgBox();
}

function Search() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }

  let value = document.querySelectorAll(".nameCustomer")[1].value
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
                <td >${account[i].amount}</td>
                <td >
                  <a onclick="Edit(event)" id="${account[i].nu}" class="fa-solid fa-pen-to-square"></a>
                  <a onclick="deletevalue(id)" id="${account[i].nu}" class="fa-solid fa-trash"></a>
                </td>
            </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}
