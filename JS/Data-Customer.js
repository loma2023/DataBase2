let items_list = document.querySelector(".Items-list")
items_list.querySelectorAll("a")[1].classList.add("hoverd")
let pages = document.querySelector(".pages")
pages.querySelectorAll("a")[0].classList.add("hoverd")

function fetches() {
  fetch(Customers_URL)
    .then((response) => response.json())
    .then((row) => {
      localStorage.removeItem("account")
      let account = []
      let obj = ""
      let colum = "";
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        obj = { name: colum[1], address: colum[2], phone: colum[3], pen: colum[0] }
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
    let hiddAddress = account[i].address; let address = account[i].address ; let hiddPhone=account[i].phone ; let phone = account[i].phone ;
    if (hiddAddress === "Null") {hiddAddress = "display:none" ; address = ""}
    if (hiddPhone === "Null") {hiddPhone = "display:none" ; phone = "" }
    element += `
            <div class="cart">
                <div class="cart-up">
                    <img src="CSS/avatar.svg" alt="">
                    <div class="details">
                        <h3>
                            <span class="fas fa-address-book"></span>
                            <span class="name">${account[i].name}</span>
                        </h3>
                        <h3 style="${hiddAddress}">
                            <span class="fas fa-location-dot"></span>
                            <span class="address">${address}</span>
                        </h3>
                        <h3 style="${hiddPhone}">
                            <span class="fas fa-phone-flip"></span>
                            <span class="phone">${phone}</span>
                        </h3>
                    </div>
                </div>
                <div class="cart-down">
                    <a style="${hiddPhone}" href="tel:${phone}" class="fa-solid fa-phone"></a>
                    <a target="_blank" style="${hiddPhone}" href="https://wa.me/${phone}" class="fab fa-whatsapp"></a>
                    <a onclick="Edit(event)" id="${account[i].pen}" class="fa-solid fa-pen-to-square"></a>
                    <a onclick="deletevalue(id)" id="${account[i].pen}" class="fa-solid fa-trash"></a>
                </div>
            </div>`

  }
  document.querySelector(".container-contact").innerHTML = element
  document.querySelector(".loader").classList.add("Done")

}

function insert_value(id) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Insert === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }
  
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let name = $(".name").val();
  let address = $(".address").val();
  let phone = $(".phone").val();
  let url ;
  let id1 ;

  if (name == "") { alert("اكتب اسم العميل"); return }
  if (address === "") { address = "Null" }
  if (phone === "") { phone = "Null" }

  if (id == "save") {
    for (let i = 0; i < account.length; i++) {
      let tname = account[i].name
      if (name == tname) { alert("الاسم موجود بالفعل"); return }
    }
    MsgBox();
     id1 = "=row()-2"  
    url = Customers_URL + "?name=" + name + "&id=" + id1 + "&action=insert" + "&address=" + address + "&phone=" + phone
  } else {
    if (name != account[id].name) {
      for (let i = 0; i < account.length; i++) {
        let tname = account[i].name
        if (name == tname) { alert("الاسم موجود بالفعل"); return }
      }
    }
    MsgBox();
    url = Customers_URL + "?name=" + name + "&id=" + id + "&action=update" + "&address=" + address + "&phone=" + phone
  }
  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
}

function Edit(event) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Edit === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let btn = event.target;
  let parent = btn.parentElement.parentElement
  document.querySelector(".btn_save").id = btn.id;
  document.querySelector(".name").value = parent.querySelector(".name").innerText
  document.querySelector(".address").value = parent.querySelector(".address").innerText
  document.querySelector(".phone").value = parent.querySelector(".phone").innerText
  window.scroll({ top: 0, behavior: 'smooth' });
}

function deletevalue(id) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Delete === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let url =  Customers_URL + "?id=" + id + "&action=delete";
  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
  MsgBox();
}

function Search() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  let value = document.querySelector(".inputSearch").value
  for (let i = 0; i < account.length; i++) {
    if (account[i].name.includes(value)) {
      element += `
            <div class="cart">
                <div class="cart-up">
                    <img src="CSS/avatar.svg" alt="">
                    <div class="details">
                        <h3>
                            <span class="fas fa-address-book"></span>
                            <span class="name"> ${account[i].name} </span>
                        </h3>
                        <h3>
                            <span class="fas fa-location-dot"></span>
                            <span class="address"> ${account[i].address} </span>
                        </h3>
                        <h3>
                            <span class="fas fa-phone-flip"></span>
                            <span class="phone"> ${account[i].phone} </span>
                        </h3>
                    </div>
                </div>
                <div class="cart-down">
                    <a href="tel:${account[i].phone}" class="fa-solid fa-phone"></a>
                    <a target="_blank" style="${hiddPhone}" href="https://wa.me/${phone}" class="fab fa-whatsapp"></a>
                    <a onclick="Edit(event)" id="${account[i].pen}" class="fa-solid fa-pen-to-square"></a>
                    <a onclick="deletevalue(id)" id="${account[i].pen}" class="fa-solid fa-trash"></a>
                </div>
            </div>`
    }
  }
  document.querySelector(".container-contact").innerHTML = element
}
