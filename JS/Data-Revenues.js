let items_list = document.querySelector(".Items-list")
items_list.querySelectorAll("a")[5].classList.add("hoverd")
let pages = document.querySelector(".pages")
pages.querySelectorAll("a")[0].classList.add("hoverd")

function fetches() {
  fetch(Revenues_URL)
    .then((response) => response.json())
    .then((row) => {
      localStorage.removeItem("account")
      let account = []
      let obj = ""
      let colum = "";
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        obj = { name: colum[1], pen: colum[0] }
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
          <div class="cart">
              <div class="cart-up">
                  <div class="details">
                      <h3 class="">
                          <span class="fas fa-arrow-left"></span>
                          <span class="name"> ${account[i].name} </span>
                      </h3>
                  </div>
              </div>
              <div class="cart-down">
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
  let url; let id1
  if (name == "") { alert("اكتب اسم الايراد"); return }

  if (id == "save") {
    for (let i = 0; i < account.length; i++) {
      let tname = account[i].name
      if (name == tname) { alert("الاسم موجود بالفعل"); return }
    }
    MsgBox();
    id1 = "=row()-2"
    url = Revenues_URL + "?name=" + name + "&id=" + id1 + "&action=insert";
  } else {
    if (name != account[id].name) {
      for (let i = 0; i < account.length; i++) {
        let tname = account[i].name
        if (name == tname) { alert("الاسم موجود بالفعل"); return }
      }
    }
    MsgBox();
    url = Revenues_URL + "?name=" + name + "&id=" + id + "&action=update";
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
  window.scroll({ top: 0, behavior: 'smooth' });
}

function deletevalue(id) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Delete === "No" ) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let url = Revenues_URL  + "?id=" + id + "&action=delete";
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
                  <div class="details">
                      <h3 class="">
                          <span class="fas fa-arrow-left"></span>
                          <span class="name"> ${account[i].name} </span>
                      </h3>
                  </div>
              </div>
              <div class="cart-down">
                  <a onclick="Edit(event)" id="${account[i].pen}" class="fa-solid fa-pen-to-square"></a>
                  <a onclick="deletevalue(id)" id="${account[i].pen}" class="fa-solid fa-trash"></a>
              </div>
          </div>`
    }
  }
  document.querySelector(".container-contact").innerHTML = element
}
