if (localStorage.UserData == null) { location.href = "index.html" }
let UserData = JSON.parse(localStorage.UserData);

document.querySelector("head").innerHTML += `<link rel="icon" href="${UserData[0].imgUser}">`

document.querySelector(".list").innerHTML = `
<h1 class="logo"><a class="fab fa-meetup"></a>odern<span> App</span></h1>
<div class="Items-list">
    <i onclick="toggle()" class="fas fa-circle-xmark"></i>
    <a class="item" href="Home.html">
        <span class="fas fa-home"></span>
        <span>الصفحة الرئيسيه</span>
    </a>
    <a class="item" href="Data-Customer.html">
        <span class="fas fa-users"></span>
        <span>العملاء</span>
    </a>
    <a class="item" href="Receipts.html">
        <span class="fas fa-scroll"></span>
        <span>الفواتير</span>
    </a>
    <a class="item" href="Account-Cash.html">
        <span class="fas fa-folder"></span>
        <span>النشاط</span>
    </a>
    <a class="item" href="Data-Expenses.html">
        <span class="fas fa-atom"></span>
        <span>المصروفات</span>
    </a>
    <a class="item" href="Data-Revenues.html">
        <span class="fas fa-atom"></span>
        <span>الإيرادات</span>
    </a>
    <a class="item" href="Account-General.html">
        <span class="fas fa-folder-open"></span>
        <span>قيود اليومية</span>
    </a>
    <a class="item" href="Profits.html">
        <span class="fas fa-chart-simple"></span>
        <span>الارباح</span>
    </a>
    <a class="item" href="Setting.html">
        <span class="fas fa-gear"></span>
        <span>الاعدادات</span>
    </a>
    <a class="item" onclick="SignOut()">
        <span class="fas fa-right-from-bracket"></span>
        <span>خروج</span>
    </a>
</div>`

document.querySelector(".header").innerHTML = `
<a onclick="toggle()" class="fas fa-align-right"></a>
<div class="pages"></div>
<div class="left-header">
    <div>
        <span></span>
        <h4>${UserData[0].Username}</h4>
        <p>${UserData[0].Email}</p>
    </div>
   <a href="Setting.html"><img class="img-user" src="${UserData[0].imgUser}" alt=""></a>
</div>`

if (document.title === "الصفحه الرئيسية") {
    document.querySelector(".img-home").src = UserData[0].imgBg ;
    document.querySelector(".header").style.background = "none"
    document.querySelector(".header").style.boxShadow = "none"
    let items_list = document.querySelector(".Items-list")
    items_list.querySelectorAll("a")[0].classList.add("hoverd")
}

document.querySelector(".main").innerHTML += `
<audio src="CSS/Msg.mp3"></audio>
<div class="parentMsg">
    <div class="Msg-Box">
        <a class="fa fa-cloud-arrow-up"></a>
        <h1> جارِ حفظ البيانات </h1>
        <div class="bg-loader">
            <div class="load"></div>
        </div>
    </div>
</div>`

document.querySelector(".footer").innerHTML += `
<div>© 2023 Esla<a class="fab fa-meetup"></a> Loma. All Rights Reserved</div>
<div class="social-media">
    <a href="#" class="fab fa-facebook-f"></a>
    <a href="#" class="fab fa-whatsapp"></a>
    <a href="https://www.instagram.com/faceloma/?hl=ar" class="fab fa-instagram"></a>
    <a href="#" class="fab fa-twitter"></a>
    <a href="#" class="fab fa-linkedin-in"></a>
    <a href="#" class="fab fa-google"></a>
    <a href="#" class="fas fa-phone"></a>
</div>`


if (document.title == "العملاء" || document.title == "كشف حساب العملاء" ) {
    document.querySelector(".pages").innerHTML = `
            <a href="Data-Customer.html">
                <span class="fas fa-users"></span>
                <span> العملاء </span>
            </a>
            <a href="Account-Customer.html">
                <span class="fas fa-file"></span>
                <span> الحساب </span>
            </a>
             `
}
else if (document.title.includes("الفواتير") || document.title == "الدفع للعملاء" || document.title == "التحصيل من العملاء" ) {
    document.querySelector(".pages").innerHTML = `
            <a href="Receipts.html">
                <span class="fas fa-file"></span>
                <span> الفواتير </span>
            </a>
            <a href="General-Customer1.html">
                <span class="fas fa-sack-dollar"></span>
                <span> التحصيل </span>
            </a>
            <a href="General-Customer2.html">
                <span class="fas fa-sack-dollar"></span>
                <span> الدفع </span>
            </a> `
}

else if (document.title == "كشف حساب النقدية" || document.title == "كشف حساب التأجير" || document.title == "كشف حساب الاستئجار") {
    document.querySelector(".pages").innerHTML = `
            <a href="Account-Cash.html">
                <span class="fas fa-file"></span>
                <span> حساب النقدية </span>
            </a>
            <a href="Account-Tageer.html">
                <span class="fas fa-file"></span>
                <span> حساب التأجير </span>
            </a>
            <a href="Account-Astagar.html">
                <span class="fas fa-file"></span>
                <span> حساب الاستئجار </span>
            </a> `

}
else if (document.title.includes("مصروف")) {
    document.querySelector(".pages").innerHTML = `
            <a href="Data-Expenses.html">
                <span class="fas fa-file"></span>
                <span>المصروفات</span>
            </a>
            <a href="Account-Expenses.html">
                <span class="fas fa-file"></span>
                <span> حساب المصروفات </span>
            </a>
            <a href="General-Expenses.html">
                <span class="fas fa-file"></span>
                <span>دفع مصروف</span>
            </a> `

}
else if (document.title.includes("ايراد")) {
    document.querySelector(".pages").innerHTML = `
                <a href="Data-Revenues.html">
                    <span class="fas fa-file"></span>
                    <span>الايرادات</span>
                </a>
                <a href="Account-Revenues.html">
                    <span class="fas fa-file"></span>
                    <span> حساب الايرادات </span>
                </a>
                <a href="General-Revenues.html">
                    <span class="fas fa-file"></span>
                    <span>تحصيل ايراد</span>
                </a> `

}


function MsgBox() {
    document.querySelector("audio").play();
    let parent = document.querySelector(".parentMsg");
    let loader = parent.querySelector(".bg-loader");
    parent.classList.add("active");
    setTimeout(() => {
        loader.style.display = "none";
        parent.querySelector("a").classList.remove("fa-cloud-arrow-up")
        parent.querySelector("a").classList.add("fa-check")
        parent.querySelector("h1").innerText = " تم الحفظ "
    }, 4000);
    setTimeout(() => { parent.classList.remove("active"); }, 5000);
    setTimeout(() => { location.reload(); }, 5300);
}

function Doprint(event) {
    document.querySelector("body").classList.add("body-active")
    document.querySelector(".list").style.display = "none"
    document.querySelector(".main").style.padding = "5px"
    document.querySelector(".header").style.display = "none"
    document.querySelector(".parentMsg").style.display = "none"
    document.querySelector(".footer").style.display = "none"

    event.target.style.display = "none"
    let section = document.querySelector(".section-search")
    if (section != null) { section.style.display = "none" }
    let forPrint = document.querySelector(".Forprint")
    if (forPrint != null) { forPrint.style.display = "grid" }

    let theed = document.querySelector("table")
    let td = theed.querySelectorAll("td")
    td.forEach(td => {
        td.style.background = "#fff"
        td.style.color = "#000"
        td.style.fontSize = "15px"
        td.style.border = "1px solid #000"
    });
    print();
}

setTimeout(() => {
    if (document.querySelector(".loader").classList.contains("Done") != true) {
        location.reload();
    }
}, 10000);

function toggle() {
    document.querySelector("body").classList.toggle("body-active");
};

function SignOut() {
    localStorage.removeItem("username")
    location.href = "index.html"
}

let General_URL = "https://script.google.com/macros/s/AKfycbwOXVx5YlkB87VOz6cX3nIUoYcUndvHvWh53N8rdyYG6UgMgFjn19TTm2UG3p9k3NbA/exec";
let Customers_URL = "https://script.google.com/macros/s/AKfycbzS3wMQn3vDscd-g1L_flA00Q0vYm_t8LylTGObM2odiQufNPxiZW2lIH8vKLDuErcZ/exec";
let Expenses_URL = "https://script.google.com/macros/s/AKfycbwUIHOMRkgC_nYBi_JXfwi5tCXR97tBGQ39WQsK80_zDEE11RvJg4WpR6deTJ3y8FkV/exec";
let Revenues_URL = "https://script.google.com/macros/s/AKfycbzB6TOKsDvqJ11JoMMB72ZWYdbiKQDCaNHqo0GM5EFf_D8e7JqNTnz2ImLY59NBFXSY/exec"
let Profits_URL = "https://script.google.com/macros/s/AKfycbyubQA2iBGxJ8e6H9bzWiuPefIAloupwLyhm2qFvizyMfahW3GtbO_ISQsNDrc0pqd9/exec"
let urlImages = "https://script.google.com/macros/s/AKfycbzInpr5KRwBxBy48MISwiYRyjabobjS2OyRjdQ6fzSyIngT3gLeSeepuo0WRRlpPjI0/exec";
let Login_URL = "https://script.google.com/macros/s/AKfycbw0GpDKkYbDutVr5oPkLd_TnkXhONuvLtl89cCpnhn59BZN7Iae7qDzx2f1yAXRGZkJ/exec"
