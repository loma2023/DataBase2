let Login_URL = "https://script.google.com/macros/s/AKfycbw0GpDKkYbDutVr5oPkLd_TnkXhONuvLtl89cCpnhn59BZN7Iae7qDzx2f1yAXRGZkJ/exec"

function login() {
  let username = document.querySelector(".username")
  let password = document.querySelector(".password")

  if (username.value == "" || password.value == "") { return }
  document.querySelector(".loader").style.display = ""
  let UserData = [];
  fetch(Login_URL)
    .then((response) => response.json())
    .then((row) => {
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        if (colum[1] === username.value) {
          if (colum[4] == password.value) {
            let obj = {id:colum[0],Username:colum[1], Email: colum[2],Phone:colum[3],Pass:colum[4], imgUser: colum[5],imgBg:colum[6],Type:colum[7],Insert:colum[8],Edit:colum[9],Delete:colum[10] };
            UserData.push(obj)
            localStorage.setItem("UserData", JSON.stringify(UserData))
            location.href = "Home.html"
            return
          }
          else {document.querySelector(".loader").style.display = "none" ;alert("كلمة المرور خطأ"); return }
        }
      }
      document.querySelector(".loader").style.display = "none"
      alert("اسم المستخدم خطأ")
    })
}

function sendEmail() {
  let username = document.querySelector(".username")
  if (username.value == "") { alert("اكتب اسم المستخدم"); return }

  fetch(Login_URL)
    .then((response) => response.json())
    .then((row) => {
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        if (colum[2] === username.value) {
          Email.send({
            SecureToken: "585b81bb-37a9-4a98-8c00-9f4232394efc",
            To: colum[1],
            From: "loma8064@gmail.com",
            Subject: "كلمة المرور",
            Body: "كلمة المرور الخاصه بك هي" + "<br><br>" + colum[3]
          })
          document.querySelector(".DoneSent").style.display = "table"
          return
        }
      }
      alert("اسم المستخدم خطأ")
    })
}

function showPassword(event) {
  let parent = event.target.parentElement;
  let input = parent.querySelector("input")
  if (input.type == "text") {
    input.type = "password"
    event.target.classList.add("fa-eye")
    event.target.classList.remove("fa-eye-slash")
  }else{
    input.type = "text"
    event.target.classList.remove("fa-eye")
    event.target.classList.add("fa-eye-slash")
  }
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  document.title = "Sign up"
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  document.title = "Sign in"
});
