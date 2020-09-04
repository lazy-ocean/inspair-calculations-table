import { plural } from "../utils";

export function calculate(values) {
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
    const ENEGRYCONS = 5;
    // Процент загрузки робота
    const CARRYINGCAPACITY = 0.9;
    // Инфляция
    const INFLATION = 0.05;
    // Стоимость электроэнергии
    const ELECTRICITYCOSTS = 4.5;
    // Кол-во рабочих часов в смену
    const WORKHOURS = 8;
    // Кол-во недель в году
    const WORKWEEKS = 50;
    const yearIndex = 1 + (year - 1) * INFLATION;
    let row = {};
    row.year = year;
    /////// maintenance - Стоимость обслуживания, ₽ [2]
    year % 5 === 0 ? (row.maintenance = 360000) : (row.maintenance = 120000);
    //prettier-ignore
    /////// operational - Стоимость операционных расходов,₽ [3]
    row.operational = ENEGRYCONS * Robots * CARRYINGCAPACITY * yearIndex * Shifts * WorkingDays * ELECTRICITYCOSTS * WORKHOURS * WORKWEEKS;
    /////// salary saved - Экономия ФОТ, ₽ [4]
    /////// investments - Стоимость вложений, ₽ [1]
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
    /////// performanceSaved - Экономия за счет увеличения производительности, ₽ [5]
    row.performanceSaved = row.salarySaved * (Performance / 100);
    /////// otherSaved - Прочая экономия, ₽ [6]
    row.otherSaved = Savings;

    /////// cashflowYear - Ежегодный кэш-флоу, ₽ [7]
    /////// cashflow - Суммарный кэш-флоу, ₽ [8]
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

export function calculatePayback(table) {
  // Кол-во лет до окупаемости
  const payback = table.find((row) => row.cashflow > 0) || null;
  if (payback === null) return null;

  // Предполагаем, что окупается за N лет + m месяцев, поэтому отнимаем от первого положительного года 1, чтобы посчитать месяцы
  let paybackYears = payback.year - 1;

  // Кол-во месяцев до окупаемости:
  const paybackRow = table[Math.max(paybackYears - 1, 0)];
  const {
    salarySaved,
    performanceSaved,
    otherSaved,
    maintenance,
    operational,
    investments,
  } = paybackRow;
  const savings = salarySaved + performanceSaved + otherSaved;
  const spendings = maintenance + operational;

  let cashflow = paybackYears > 0 ? paybackRow.cashflow : -investments;
  let delta = (savings - spendings) / 12;
  let paybackMonths = Math.ceil(-cashflow / delta);
  //console.log(cashflow, delta);

  if (paybackMonths >= 12) {
    paybackMonths -= 12;
    paybackYears += 1;
  }

  //console.log(paybackYears, paybackMonths);
  return { paybackYears, paybackMonths };
}
