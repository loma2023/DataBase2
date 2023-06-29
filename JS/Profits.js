document.querySelector(".pages").innerHTML = `
<a href="Profits.html">
    <span class="fas fa-file"></span>
    <span> السنه الحالية </span>
</a>
<a href="Profits2.html">
    <span class="fas fa-file"></span>
    <span> السنه السابقة </span>
</a>
 `

let items_list = document.querySelector(".Items-list")
items_list.querySelectorAll("a")[7].classList.add("hoverd")
let pages = document.querySelector(".pages")

if (document.title == "ارباح السنه الحاليه") {
  pages.querySelectorAll("a")[0].classList.add("hoverd")
} else if (document.title == "ارباح السنه السابقة") {
  pages.querySelectorAll("a")[1].classList.add("hoverd")
}



fetch(Profits_URL)
  .then((response) => response.json())
  .then((row) => {
    localStorage.removeItem("account")
    let account = []
    let colum = "";
    for (let i = 1; i < row.length; i++) {
      colum = row[i];
      if (document.title === "ارباح السنه الحاليه") {
        if (colum[8].includes("الحاليه")) {
          let obj = { name: colum[0], tageer: colum[1], astagar: colum[2], subtotal: colum[3], Revenues: colum[4], Expenses: colum[5], total: colum[6] }
          account.push(obj)
        }
      } else if (document.title === "ارباح السنه السابقة") {
        if (colum[8].includes("السابقة")) {
          let obj = { name: colum[0], tageer: colum[1], astagar: colum[2], subtotal: colum[3], Revenues: colum[4], Expenses: colum[5], total: colum[6] }
          account.push(obj)
        }
      }
      localStorage.setItem("account", JSON.stringify(account))
    }
    showData()
  })


function showData() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  for (let i = 0; i < account.length; i++) {
    element += `
              <tr>
                <td >${account[i].name}</td>
                <td >${account[i].tageer}</td>
                <td >${account[i].astagar}</td>
                <td >${account[i].subtotal}</td>
                <td >${account[i].Revenues}</td>
                <td >${account[i].Expenses}</td>
                <td >${account[i].total}</td>
              </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
  let x = new Date().getMonth()
  document.querySelectorAll("tr")[x + 1].style.border = "2px solid #999";
  document.querySelectorAll(".chart-title")[1].innerText = "الشكل التوضيحي لشهر " + account[x].name;
  if (document.title === "ارباح السنه الحاليه") {
    document.querySelectorAll(".chart-title")[2].innerText = "الشكل التوضيحي لعام " + new Date().getFullYear();  
  }else{
    document.querySelectorAll(".chart-title")[2].innerText = "الشكل التوضيحي لعام " + (new Date().getFullYear() - parseFloat(1));
  }

  document.querySelector(".loader").classList.add("Done")

  charts()
}

function charts() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let x = new Date().getMonth()

  var barChartOptions = {
    series: [{ name: " ", data: [account[x].total, account[x].Expenses, account[x].Revenues, account[x].subtotal, account[x].astagar, account[x].tageer] }],
    chart: { type: 'bar', height: 350, toolbar: { show: false }, },
    colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1", "#035e7b"],
    plotOptions: { bar: { distributed: true, borderRadius: 4, horizontal: false, columnWidth: '40%', } },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: { categories: ["صافي الربح", "المصروفات", "الإيرادات", "مجمل الربح", "الاستئجار", "التأجير"], },
    yaxis: { title: { text: "" } }
  };
  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();

  //====================الشكل الثاني =======================  
  var barChartOptions2 = {
    series: [
      { name: 'صافي الربح ', data: [account[11].total, account[10].total, account[9].total, account[8].total, account[7].total, account[6].total, account[5].total, account[4].total, account[3].total, account[2].total, account[1].total, account[0].total] },
      { name: 'المصروفات ', data: [account[11].Expenses, account[10].Expenses, account[9].Expenses, account[8].Expenses, account[7].Expenses, account[6].Expenses, account[5].Expenses, account[4].Expenses, account[3].Expenses, account[2].Expenses, account[1].Expenses, account[0].Expenses] },
      { name: 'الإيرادات ', data: [account[11].Revenues, account[10].Revenues, account[9].Revenues, account[8].Revenues, account[7].Revenues, account[6].Revenues, account[5].Revenues, account[4].Revenues, account[3].Revenues, account[2].Revenues, account[1].Revenues, account[0].Revenues] },
      { name: 'مجمل الربح ', data: [account[11].subtotal, account[10].subtotal, account[9].subtotal, account[8].subtotal, account[7].subtotal, account[6].subtotal, account[5].subtotal, account[4].subtotal, account[3].subtotal, account[2].subtotal, account[1].subtotal, account[0].subtotal] },
      { name: 'الأستئجار ', data: [account[11].astagar, account[10].astagar, account[9].astagar, account[8].astagar, account[7].astagar, account[6].astagar, account[5].astagar, account[4].astagar, account[3].astagar, account[2].astagar, account[1].astagar, account[0].astagar] },
      { name: 'التأجير ', data: [account[11].tageer, account[10].tageer, account[9].tageer, account[8].tageer, account[7].tageer, account[6].tageer, account[5].tageer, account[4].tageer, account[3].tageer, account[2].tageer, account[1].tageer, account[0].tageer] }],

    chart: { height: 350, type: 'bar', toolbar: { show: false, }, },
    colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1", "#035e7b"],
    dataLabels: { enabled: false, },
    stroke: { curve: 'smooth' },
    labels: ["ديسمبر", "نوفمبر", "أكتوبر", "سبتمبر", "أغسطس", "يونيو", "يوليو", "مايو", "أبريل", "مارس", "فبراير", "يناير"],
  };
  var areaChart = new ApexCharts(document.querySelector("#bar-chart2"), barChartOptions2);
  areaChart.render();

  //====================الشكل الثالث =======================  
  var radarChartOptions = {
    series: [
      { name: ' التأجير ', data: [account[0].tageer, account[1].tageer, account[2].tageer, account[3].tageer, account[4].tageer, account[5].tageer, account[6].tageer, account[7].tageer, account[8].tageer, account[9].tageer, account[10].tageer, account[11].tageer] },
      { name: ' الأستئجار ', data: [account[0].astagar, account[1].astagar, account[2].astagar, account[3].astagar, account[4].astagar, account[5].astagar, account[6].astagar, account[7].astagar, account[8].astagar, account[9].astagar, account[10].astagar, account[11].astagar] },
      { name: ' مجمل الربح ', data: [account[0].subtotal, account[1].subtotal, account[2].subtotal, account[3].subtotal, account[4].subtotal, account[5].subtotal, account[6].subtotal, account[7].subtotal, account[8].subtotal, account[9].subtotal, account[10].subtotal, account[11].subtotal] },
      { name: ' الإيرادات ', data: [account[0].Revenues, account[1].Revenues, account[2].Revenues, account[3].Revenues, account[7].Revenues, account[5].Revenues, account[6].Revenues, account[7].Revenues, account[8].Revenues, account[9].Revenues, account[10].Revenues, account[11].Revenues] },
      { name: ' المصروفات ', data: [account[0].Expenses, account[1].Expenses, account[2].Expenses, account[3].Expenses, account[7].Expenses, account[5].Expenses, account[6].Expenses, account[7].Expenses, account[8].Expenses, account[9].Expenses, account[10].Expenses, account[11].Expenses] },
      { name: ' صافي الربح ', data: [account[0].total, account[1].total, account[2].total, account[3].total, account[4].total, account[5].total, account[6].total, account[7].total, account[8].total, account[9].total, account[10].total, account[11].total] },],

    chart: { height: 350, type: 'radar', toolbar: { show: false, }, },
    colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1", "#035e7b"],
    dataLabels: { enabled: false, },
    stroke: { curve: 'smooth' },
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يوليو", "يونيو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  };
  var radarChart = new ApexCharts(document.querySelector("#radar-chart"), radarChartOptions);
  radarChart.render();
}

//1-bar
//2-area
//3-radar
//4-line
//5-scatter 

