export default (tableArr, highlightedRow) => {
  let table = [
    '<table id="resultTable"><tr><th>Year</th><th>Annual cash flow,&nbsp;₽</th><th>Total cash flow,&nbsp;₽</th><th>Investments,&nbsp;₽</th><th>Maintenance,&nbsp;₽</th><th>Operational costs,&nbsp;₽</th><th>Salary savings,&nbsp;₽</th><th>Performance savings,&nbsp;₽</th></tr>',
  ];
  for (let i = 0; i < tableArr.length; i++) {
    const {
      year,
      investments,
      maintenance,
      operational,
      salarySaved,
      performanceSaved,
      cashflowYear,
      cashflow,
    } = tableArr[i];
    let str = [
      year,
      cashflowYear,
      cashflow,
      investments,
      maintenance,
      operational,
      salarySaved,
      performanceSaved,
    ]
      .map((column) => `<td>${column.toLocaleString("ru")}</td>`)
      .join("");
    table.push(
      `<tr class=${i === highlightedRow ? "isHighlighted" : ""}>${str}</tr>`
    );
  }
  table.push("</table>");
  let HTMLtable = table.join("");
  return HTMLtable;
};
