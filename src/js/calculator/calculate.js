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
    const ENEGRYCONS = 5;
    const CARRYINGCAPACITY = 0.9;
    const INFLATION = 0.05;
    const ELECTRICITYCOSTS = 4.5;
    const WORKHOURS = 12;
    const WORKWEEKS = 50;
    const yearIndex = 1 + (year - 1) * INFLATION;
    let row = {};
    row.year = year;
    year % 5 === 0 ? (row.maintenance = 360000) : (row.maintenance = 120000);
    //prettier-ignore
    row.operational = ENEGRYCONS * Robots * CARRYINGCAPACITY * yearIndex * Shifts * WorkingDays * ELECTRICITYCOSTS * WORKHOURS * WORKWEEKS;
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
    row.performanceSaved = row.salarySaved * (Performance / 100);
    row.otherSaved = Savings;

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
  // Years till positive payback - ROI
  const payback = table.find((row) => row.cashflow > 0) || null;
  if (payback === null) return null;

  // Assuming that project is paying off in N years so minus one from the first positive payback year to calculate months
  let paybackYears = payback.year - 1;

  // months till positive payback
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

  if (paybackMonths >= 12) {
    paybackMonths -= 12;
    paybackYears += 1;
  }

  return { paybackYears, paybackMonths };
}
