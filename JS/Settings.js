
let items_list = document.querySelector(".Items-list")
items_list.querySelectorAll("a")[8].classList.add("hoverd")

let left = document.querySelector(".left")
left.querySelector(".imgUser").src = UserData[0].imgUser
left.querySelector("h2").innerText = UserData[0].Username
left.querySelectorAll("p")[0].innerText = UserData[0].Email
left.querySelectorAll("p")[1].innerText = UserData[0].Phone
left.querySelectorAll("p")[2].innerText = UserData[0].Type
left.querySelectorAll("p")[3].innerText = UserData[0].Insert
left.querySelectorAll("p")[4].innerText = UserData[0].Edit
left.querySelectorAll("p")[5].innerText = UserData[0].Delete

function userimg(event) {
  let file = event.target
  let right = document.querySelector(".right")
  let imgloader = document.querySelector(".imgloader");
  let imgUser = right.querySelector(".imgUser");
  let fr = new FileReader();

  fr.addEventListener('loadend', () => {
    let res = fr.result;
    imgloader.style.display = "table"
    imgloader.classList.add("waiting")
    imgUser.src = res
    let obj = {
      base64: res.split("base64,")[1],
      type: file.files[0].type,
      name: file.files[0].name,
    }
    fetch(urlImages, {
      method: "POST",
      body: JSON.stringify(obj)
    })
      .then(r => r.text())
      .then((data) => { imgUser.src = data, imgUser.id = data })
      .then(() => imgloader.style.display = "none")
      .then(() => imgloader.classList.remove("waiting"))
  })
  fr.readAsDataURL(file.files[0])
}
function bgimg(event) {
  let imgloader = document.querySelector(".imgloader");

  let file = event.target
  let fr = new FileReader();
  fr.addEventListener('loadend', () => {
    let res = fr.result;
    imgloader.classList.add("waiting")
    let obj = {
      base64: res.split("base64,")[1],
      type: file.files[0].type,
      name: file.files[0].name,
    }
    fetch(urlImages, {
      method: "POST",
      body: JSON.stringify(obj)
    })
      .then(r => r.text())
      .then((data) => document.querySelector(".label-bg").id = data)
      .then(() => imgloader.classList.remove("waiting"))

  })
  fr.readAsDataURL(file.files[0])
}

function ShowPowers(value) {
  if (value === "admin") {
    document.querySelector(".parent-power").style.display = "none"
  } else {
    document.querySelector(".parent-power").style.display = ""
  }
}

let checkbox = document.querySelectorAll(".checkbox")
checkbox.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.value == "true") {
      btn.value = "false"
    } else {
      btn.value = "true"
    }
  })
});

function insert_value(id) {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Type === "User") { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  let username = $(".Username").val();
  let phone = $(".phone").val();
  let email = $(".email").val();
  let password = $(".password").val();
  let Rpassword = $(".Rpassword").val();
  let type = document.querySelector(".typeuser").value
  let right = document.querySelector(".right")
  let userimg = right.querySelector(".imgUser").id
  let bgimg = document.querySelector(".label-bg").id
  let imgloader = document.querySelector(".imgloader");
  let url; let id1;

  let insert = "Yes"; let edit = "Yes"; let delet = "Yes"

  if (username == "" || phone == "" || email == "" || password == "" || Rpassword == "" || type == "نوع المستخدم") { alert(" اكمل البيانات "); return }
  if (password != Rpassword) { alert("كلمة السر غير متطابقة"); return }
  if (imgloader.classList.contains("waiting")) { alert("انتظر تحميل الصورة"); return }


  if (type == "user") {
    let i = document.querySelector(".Insert-box").value;
    let e = document.querySelector(".Edit-box").value;
    let d = document.querySelector(".Delete-box").value;
    insert = "No"; edit = "No"; delet = "No"
    if (i == "true") { insert = "Yes" }
    if (e == "true") { edit = "Yes" }
    if (d == "true") { delet = "Yes" }
  }

  if (id == "save") {
    MsgBox();
    id1 = "=row()-2"
    url = Login_URL + "?action=insert" + "&id=" + id1 + "&username=" + username + "&phone=" + phone + "&email=" + email + "&password=" + password
      + "&userimg=" + userimg + "&bgimg=" + bgimg + "&type=" + type + "&insert=" + insert + "&edit=" + edit + "&delet=" + delet
  } else {
    MsgBox();
    url = Login_URL + "?action=update" + "&id=" + id + "&username=" + username + "&phone=" + phone + "&email=" + email + "&password=" + password
      + "&userimg=" + userimg + "&bgimg=" + bgimg + "&type=" + type + "&insert=" + insert + "&edit=" + edit + "&delet=" + delet
    let obj = { id: id, Username: username, Email: email, Phone: phone, Pass: password, imgUser: userimg, imgBg: bgimg, Type: type, Insert: insert, Edit: edit, Delete: delet };
    let UserData = [];
    UserData.push(obj)
    localStorage.setItem("UserData", JSON.stringify(UserData))

  }
  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
}

function Edit() {
  let UserData = JSON.parse(localStorage.UserData);
  if (UserData[0].Type.includes("ser")) { alert("هذه الصلاحيه لسيت متوفره لك"); return }

  document.querySelector(".Username").value = UserData[0].Username;
  document.querySelector(".phone").value = UserData[0].Phone;
  document.querySelector(".email").value = UserData[0].Email;
  document.querySelector(".password").value = UserData[0].Pass;
  document.querySelector(".Rpassword").value = UserData[0].Pass;
  let right = document.querySelector(".right")
  right.querySelector(".imgUser").src = UserData[0].imgUser;
  right.querySelector(".imgUser").id = UserData[0].imgUser;
  document.querySelector(".label-bg").id = UserData[0].imgBg;
  document.querySelector(".btn_save").id = UserData[0].id;

  document.querySelector(".typeuser").value = UserData[0].Type
  document.querySelector(".typeuser").innerHTML = `<option value="${UserData[0].Type}" disabled selected hidden>${UserData[0].Type}</option>
  <option value="admin">Admin</option>
  <option value="user">User</option>`

  if (screen.width < 1001) {
    window.scroll({ top: 620, behavior: 'smooth' });
  } else {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}

