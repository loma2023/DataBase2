let items_list = document.querySelector(".Items-list")
items_list.querySelectorAll("a")[2].classList.add("hoverd")
let pages = document.querySelector(".pages")
pages.querySelectorAll("a")[0].classList.add("hoverd")



if (screen.width < 1001) { document.querySelector(".con-Receipt").classList.remove("continer-Receipts") }
else { document.querySelector(".con-Receipt").classList.add("continer-Receipts") }


function fetchs() {
    fetch(Customers_URL)
        .then((response) => response.json())
        .then((row) => {
            let element = "";
            for (let i = 1; i < row.length; i++) {
                let colum = row[i];
                element += `<option value="${colum[1]}">${colum[1]}</option>`
            }
            let date = new Date(), yeer = date.getFullYear(), mons = date.getMonth() + 1, day = date.getDate(), fulldate
            if (mons < 10 && day < 10) { fulldate = yeer + "-0" + mons + "-0" + day }
            else if (mons > 10 && day > 10) { fulldate = yeer + "-" + mons + "-" + day }
            else if (mons > 10 && day < 10) { fulldate = yeer + "-" + mons + "-0" + day }
            else if (mons < 10 && day > 10) { fulldate = yeer + "-0" + mons + "-" + day }
            document.querySelector(".date").value = fulldate;
            document.querySelector(".nameCustomer").innerHTML += element


        })

    fetch(General_URL)
        .then((response) => response.json())
        .then((row) => {
            document.querySelector(".btn_insert").id = row.length + 1
            document.querySelector(".number").innerText += 1 + parseFloat(row.length)
            localStorage.removeItem("account")
            let account = []
            let colum = "";
            for (let i = 1; i < row.length; i++) {
                colum = row[i];
                if (colum[5] === "التأجير") {
                    let obj = { nu: colum[0], date: colum[1], type: colum[7], item: colum[2], statement: colum[3], name: colum[6], amount: colum[8] }
                    account.push(obj)

                } else if (colum[4] === "الاستئجار") {
                    let obj = { nu: colum[0], date: colum[1], type: colum[6], item: colum[2], statement: colum[3], name: colum[7], amount: colum[9] }
                    account.push(obj)
                }
                localStorage.setItem("account", JSON.stringify(account))
            }
            showData()
        })

}
fetchs()

function showData() {
    let account = []
    if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
    let element = "";
    for (let i = 0; i < account.length; i++) {
        element += `
                  <tr>
                    <td >${account[i].nu}</td>
                    <td >${account[i].date}</td>
                    <td >${account[i].type}</td>
                    <td >${account[i].name}</td>
                    <td >${account[i].item}</td>
                    <td >${account[i].amount}</td>
                    <td >${account[i].statement}</td>
                    <td >
                        <a onclick="EditReceipt(event)" id="${i}" class="fa-solid fa-pen-to-square"></a>
                        <a onclick="deleteReceipt(id)" id="${account[i].nu}" class="fa-solid fa-trash"></a>  
                    </td>
                  </tr>`
    }
    document.querySelectorAll(".table-body")[1].innerHTML = element
    document.querySelector(".loader").classList.add("Done")
}


function additem(id) {
    let tablebody = document.querySelector(".table-body");
    let btnsave = document.querySelector(".btn_save");
    let item = document.querySelector(".R-item").value
    let price = document.querySelector(".price").value
    let statement = document.querySelector(".statement").value
    let row = tablebody.querySelectorAll("tr")

    if (item === "" || price === "") { alert("ادخل البيانات كامله"); return }


    if (id === "save") {
        if (document.querySelector(".btn_insert").classList.contains("update")) { if (row.length === 1) { alert("لا يمكن اضافة اصناف عند تعديل فاتورة"); return } }

        if (row.length === 5) { alert("لقد وصلت للحد الاقصي للاصناف"); return }
        tablebody.innerHTML += `
        <tr>
            <td class="tditem">${item}</td>
            <td class="tdprice">${price}</td>
            <td class="tdstatement">${statement}</td>
            <td>
                <a id="${row.length}" class="fas fa-pen-to-square" onclick="Edit(event)"></a>
                <a id="${row.length}" class="fas fa-trash" onclick="deletevalue(event)"></a>
            </td>
        </tr>`
    } else {
        row[id].innerHTML = `
        <tr>
            <td class="tditem">${item}</td>
            <td class="tdprice">${price}</td>
            <td class="tdstatement">${statement}</td>
            <td>
                <a id="${id}" class="fas fa-pen-to-square"   onclick="Edit(event)"></a>
                <a id="${id}" class="fas fa-trash" onclick="deletevalue(event)" ></a>
            </td>
        </tr>`
    }

    total()
    btnsave.id = "save"
    document.querySelector(".R-item").value = "";
    document.querySelector(".price").value = "";
    document.querySelector(".statement").value = "";
}

function Edit(event) {
    let btn = event.target;
    let id = btn.id
    let tablebody = document.querySelector(".table-body");
    let row = tablebody.querySelectorAll("tr")[id]
    let btnsave = document.querySelector(".btn_save")
    let item = document.querySelector(".R-item")
    let price = document.querySelector(".price")
    let statement = document.querySelector(".statement")

    btnsave.id = id
    item.value = row.querySelector(".tditem").innerText;
    price.value = row.querySelector(".tdprice").innerText;
    statement.value = row.querySelector(".tdstatement").innerText;

    window.scroll({ top: 10, behavior: 'smooth' })
}

function deletevalue(event) {
    let btn = event.target;
    let id = btn.id
    let tablebody = document.querySelector(".table-body");
    let row = tablebody.querySelectorAll("tr")
    row[id].remove()
    total()
    let pen = tablebody.querySelectorAll(".fa-pen-to-square")
    let trash = tablebody.querySelectorAll(".fa-trash")
    document.querySelector(".btn_save").id = "save"
    for (let i = 0; i < row.length; i++) { pen[i].id = i; trash[i].id = i }
}

function total() {
    let tablebody = document.querySelector(".table-body");
    let row = tablebody.querySelectorAll("tr")
    let Total = 0;

    for (let i = 0; i < row.length; i++) { let price = row[i].querySelector(".tdprice").innerText; Total = Total + parseFloat(price) }

    document.querySelector(".subTotal").innerText = Total
}

// ==================================================



function insert_value(event) {
    let btn = event.target;
    let date = $(".date").val();
    let typeReceipt = document.querySelector(".typeReceipt").value;
    let nameCustomer = document.querySelector(".nameCustomer");
    let tablebody = document.querySelector(".table-body");
    let table = tablebody.querySelectorAll("tr")

    if (date === "" || typeReceipt == 0 || nameCustomer == 0) { alert("اكمل بيانات الفاتورة"); return }
    if (table.length == 0) { alert("برجاء ادخال صنف علي الاقل"); return }

    //======================= القيد ===================================================
    let url; let debit = ""; let credit = ""; let subdebit = ""; let subcredit = "";
    if (typeReceipt === "تأجير نقدي") { debit = "الصندوق"; credit = "التأجير"; subdebit = "الصندوق"; subcredit = "تأجير نقدي" }
    else if (typeReceipt === "تأجير آجل") { debit = "العملاء"; credit = "التأجير"; subdebit = nameCustomer.value; subcredit = "تأجير آجل" }
    else if (typeReceipt === "استئجار نقدي") { debit = "الاستئجار"; credit = "الصندوق"; subdebit = "استئجار نقدي"; subcredit = "الصندوق"; }
    else if (typeReceipt === "استئجار آجل") { debit = "الاستئجار"; credit = "العملاء"; subdebit = "استئجار آجل"; subcredit = nameCustomer.value; }
    //==================================================================================


    for (let i = 0; i < table.length; i++) {
        let item = table[i].querySelector(".tditem").innerText;
        let statement = table[i].querySelector(".tdstatement").innerText;
        let amountdebit = table[i].querySelector(".tdprice").innerText;
        let amountcredit = table[i].querySelector(".tdprice").innerText;
        if (btn.classList.contains("save")) {
            let row = i + parseFloat(btn.id)
            url = General_URL + "?row=" + row + "&date=" + date + "&nu=" + '"R"' + "&action=insert" + "&statement=" + statement +
                "&debit=" + debit + "&item=" + item + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit +
                "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit;

        } else if (btn.classList.contains("update")) {
            let sr = parseFloat(btn.id.replace('R', ''));
            let row = i + parseFloat(sr)
            let stop = 0
            if (i == table.length - 1) { stop = 1 }

            url = General_URL + "?row=" + row + "&date=" + date + "&nu=" + '"R"' + "&action=update" + "&statement=" + statement +
                "&debit=" + debit + "&item=" + item + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit +
                "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit + "&stop=" + stop;

        }
        let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    }

    MsgBox();
}

function deleteReceipt(id) {
    let UserData = JSON.parse(localStorage.UserData);
    if (UserData[0].Delete === "No") { alert("هذه الصلاحيه لسيت متوفره لك"); return }

    let url = General_URL + "?row=" + id + "&action=delete";
    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    MsgBox();
}

function EditReceipt(event) {
    let btn = event.target;
    let parent = btn.parentElement.parentElement;
    let btn_insert = document.querySelector(".btn_insert")


    btn_insert.classList.remove("save")
    btn_insert.classList.add("update")
    btn_insert.id = parent.querySelectorAll("td")[0].innerText
    document.querySelector(".number").innerText = parent.querySelectorAll("td")[0].innerText

    document.querySelector(".date").value = parent.querySelectorAll("td")[1].innerText
    document.querySelector(".typeReceipt").innerHTML = `<option value="${parent.querySelectorAll("td")[2].innerText}" disabled selected hidden>${parent.querySelectorAll("td")[2].innerText}</option>
                        <option value="تأجير آجل">تأجير آجل</option>
                        <option value="استئجار آجل">استئجار آجل</option>
                        <option value="تأجير نقدي">تأجير نقدي</option>
                        <option value="استئجار نقدي">استئجار نقدي </option>`
    document.querySelector(".nameCustomer").innerHTML =
        `<option value="${parent.querySelectorAll("td")[3].innerText}" disabled selected hidden>${parent.querySelectorAll("td")[3].innerText}</option>`

    let element =
        `<tr>
            <td class="tditem">${parent.querySelectorAll("td")[4].innerText}</td>
            <td class="tdprice">${parent.querySelectorAll("td")[5].innerText}</td>
            <td class="tdstatement">${parent.querySelectorAll("td")[6].innerText}</td>
            <td><a id="0" class="fas fa-pen-to-square" onclick="Edit(event)"></a><a id="0" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>
        </tr>`

    document.querySelector(".table-body").innerHTML = element
    total()
    window.scroll({ top: 0, behavior: 'smooth' });

}

