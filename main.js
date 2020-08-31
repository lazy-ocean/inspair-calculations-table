const CLASSNAMES = {
  inputs: "form-field",
};

const schema = {
  ProjectPrice: {
    label: "Стоимость проекта, руб",
    placeholder: 0,
    type: "number",
    required: true,
    min: 1000000,
    max: 50000000,
    // TEST
    value: 8400000,
  },
  FiredEmployees: {
    label: "Количество высвобождаемых работников, чел",
    placeholder: 0,
    type: "number",
    min: 1,
    max: 20,
    required: true,
    // TEST
    value: 4,
  },
  Robots: {
    label: "Количество роботов в проекте",
    placeholder: 0,
    type: "number",
    min: 1,
    max: 5,
    required: true,
    // TEST
    value: 1,
  },
  Performance: {
    label: "Ожидаемый прирост производительности, %",
    placeholder: 0,
    type: "number",
    required: true,
    min: 0,
    max: 100,
    // TEST
    value: 0,
  },
  Shifts: {
    label: "Количество смен в сутки (по 8 часов), шт.",
    placeholder: 0,
    type: "number",
    required: true,
    min: 0,
    max: 3,
    // TEST
    value: 2,
  },
  WorkingDays: {
    label: "Количество рабочих дней в неделю, шт.",
    placeholder: 0,
    type: "number",
    required: true,
    min: 1,
    max: 7,
    // TEST
    value: 7,
  },
  CostsPerPerson: {
    label: "Затраты на человека на линии в год (с учетом налогов), руб/год",
    placeholder: 0,
    type: "number",
    required: true,
    min: 420000,
    max: 1500000,
    // TEST
    value: 561168,
  },
  Savings: {
    label:
      "Дополнительная экономия (защитные костюмы, аттестации и пр.), руб/год",
    placeholder: 0,
    type: "number",
    required: true,
    min: 10000,
    max: 100000,
    // TEST
    value: 10000,
  },
};

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
////////////////////////////// СОЗДАНИЕ ФОРМЫ
const form = document.querySelector(".form");
const nodes = Object.keys(schema).map((item) => {
  const { initialValue, ...value } = schema[item];
  const attrs =
    Object.keys(value).reduce((acc, key) => {
      return acc + `${key}="${value[key]}"`;
    }, "") + `class="${CLASSNAMES.inputs}" name="${item}"`;
  let name = value["label"];
  let element = createElementFromHTML(`<label for="${item}">${name}</label>`);
  let label = createElementFromHTML(`<input ${attrs} /><br />`);
  return { element, label };
});

nodes.forEach((node) => {
  form.append(node.element);
  form.append(node.label);
});

////////////////////////////// ВАЛИДАЦИЯ
const validate = (values) => {
  let errors = {};
  Object.keys(values).forEach((item) => {
    if (schema[item].required && !values[item]) {
      errors[item] = "Пожалуйста, заполните поле";
    }
  });
  return errors;
};

////////////////////////////// РАСЧЕТЫ
function calculate(values) {
  const intValues = Object.keys(values).reduce((acc, item) => {
    acc[item] = parseFloat(values[item]);
    return acc;
  }, {});

  const {
    ProjectPrice,
    FiredEmployees,
    Robots,
    Performance,
    Shifts,
    WorkingDays,
    CostsPerPerson,
    Savings,
  } = intValues;

  const tableArr = [];
  const maxYears = 20;
  for (let year = 1; year <= maxYears; year++) {
    // Расход энергии роботом
    let energyCons = 5;
    // Процент загрузки робота
    let carryingCapacity = 0.9;
    // Инфляция
    let inflation = 0.05;
    // Стоимость электроэнергии
    let electricityCosts = 4.5;
    // Кол-во рабочих часов в смену
    let workHours = 8;
    // Кол-во недель в году
    let workWeeks = 50;
    let yearIndex = 1 + (year - 1) * inflation;
    let row = {};
    row.year = year;
    /////// maintenance - Стоимость обслуживания, руб. [2]
    year % 5 === 0 ? (row.maintenance = 360000) : (row.maintenance = 120000);
    //prettier-ignore
    /////// operational - Стоимость операционных расходов,руб. [3]
    row.operational = energyCons * Robots * carryingCapacity * yearIndex * Shifts * WorkingDays * electricityCosts * workHours * workWeeks;
    /////// salary saved - Экономия ФОТ, руб. [4]
    /////// investments - Стоимость вложений, руб. [1]
    if (year === 1) {
      row.salarySaved =
        FiredEmployees * CostsPerPerson * yearIndex -
        CostsPerPerson * (FiredEmployees / 5);
      row.investments = ProjectPrice;
    } else {
      row.investments = 0;
      row.salarySaved =
        FiredEmployees * CostsPerPerson * yearIndex -
        CostsPerPerson * (FiredEmployees / 5) * yearIndex;
    }
    /////// performanceSaved - Экономия за счет увеличения производительности, руб. [5]
    row.performanceSaved = row.salarySaved * (Performance / 100);
    /////// otherSaved - Прочая экономия, руб. [6]
    row.otherSaved = Savings;

    /////// cashflowYear - Ежегодный кэш-флоу, руб. [7]
    /////// cashflow - Суммарный кэш-флоу, руб. [8]
    if (year === 1) {
      row.cashflowYear =
        row.salarySaved +
        row.performanceSaved +
        row.otherSaved -
        ProjectPrice -
        row.maintenance -
        row.operational;
      row.cashflow = row.cashflowYear;
    } else {
      row.cashflowYear =
        row.salarySaved +
        row.performanceSaved +
        row.otherSaved -
        row.maintenance -
        row.operational;
      row.cashflow = row.cashflowYear + tableArr[year - 2]["cashflow"];
    }
    tableArr.push(row);
  }
  return tableArr;
}

////////////////////////////// ТАБЛИЦА
const makeTable = (tableArr) => {
  let table = [
    '<table id="resultTable" border="1"><caption>Таблица окупаемости</caption><tr><th>Год</th><th>Стоимость вложений, руб.</th><th>Стоимость обслуживания, руб.</th><th>Стоимость операционных расходов,руб.</th><th>Экономия ФОТ, руб.</th><th>Экономия за счет увеличения производительности, руб.</th><th>Прочая экономия, руб.</th><th>Ежегодный кэш-флоу, руб.</th><th>Суммарный кэш-флоу, руб.</th></tr>',
  ];
  for (let item of tableArr) {
    //prettier-ignore
    const { year, investments, maintenance, operational, salarySaved, performanceSaved, otherSaved, cashflowYear, cashflow } = item;
    //prettier-ignore
    let str = [year, investments, maintenance, operational, salarySaved, performanceSaved, otherSaved, cashflowYear, cashflow]
      .map((column) => `<td>${column.toFixed(0)}</td>`)
      .join("");
    table.push(`<tr>${str}</tr>`);
  }
  table.push("</table>");
  let HTMLtable = table.join("");
  return HTMLtable;
};

////////////////////////////// SUBMIT
const onSubmit = function (event) {
  event.preventDefault();
  let values = Array.from(form.elements).reduce((acc, elem) => {
    if (elem.tagName === "INPUT") acc[elem.name] = elem.value;
    return acc;
  }, {});
  const errors = validate(values);
  if (Object.keys(errors).length) {
    //...
    console.log(errors);
    return;
  }
  const result = calculate(values);
  const tbl = createElementFromHTML(makeTable(result));
  const payback = paybackFunc(result);

  const resultTable = document.getElementById("resultTable");
  if (resultTable) resultTable.remove();

  document.body.appendChild(tbl);
};

form.addEventListener("submit", onSubmit, true);

////////// ОКУПАЕМОСТЬ
let plural = (years, months) => {
  let text = "Срок окупаемости: ";
  casesY = ["год", "года", "года", "года", "лет"];
  let indexY =
    years % 100 > 4 && years % 100 <= 20
      ? 4
      : years % 10 < 5
      ? (years % 10) - 1
      : 4;
  text += years !== 0 ? `${years} ${casesY[indexY]} ` : "";

  casesM = ["месяц", "месяца", "месяца", "месяца", "месяцев"];
  let indexM =
    months % 100 > 4 && months % 100 <= 20
      ? 4
      : months % 10 < 5
      ? (months % 10) - 1
      : 4;
  text += months !== 0 ? `${months} ${casesM[indexM]}` : "";

  return text;
};

let paybackFunc = (table) => {
  let paybackYears;
  let paybackMonths = 0;
  // Кол-во лет до окупаемости
  const payback = table.find((row) => row.cashflow > 0) || null;
  if (payback === null) return "Проект не окупается";
  // Предполагаем, что окупается за N лет + m месяцев, поэтому отнимаем от первого положительного года 1, чтобы посчитать месяцы
  paybackYears = payback.year - 1;
  // Кол-во месяцев до окупаемости:
  let paybackRow = paybackYears > 0 ? table[paybackYears - 1] : table[0];
  let {
    salarySaved,
    performanceSaved,
    otherSaved,
    maintenance,
    operational,
    investments,
  } = paybackRow;
  let savings = salarySaved + performanceSaved + otherSaved;
  let spendings = maintenance + operational;

  let tempCashflow = paybackYears > 0 ? paybackRow.cashflow : -investments;
  while (tempCashflow < 0) {
    tempCashflow += (savings - spendings) / 12;
    paybackMonths += 1;
  }
  if (paybackMonths === 12) {
    paybackMonths = 0;
    paybackYears += 1;
  }
  console.log(plural(paybackYears, paybackMonths));
  return plural(paybackYears, paybackMonths);
};
