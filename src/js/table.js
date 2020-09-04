export default (tableArr, highlightedRow) => {
  let table = [
    '<table id="resultTable"><tr><th>Год</th><th>Ежегодный кэш-флоу,&nbsp;₽</th><th>Суммарный кэш-флоу,&nbsp;₽</th><th>Вложения,&nbsp;₽</th><th>Обслуживание,&nbsp;₽</th><th>Операционные расходы,&nbsp;₽</th><th>Экономия ФОТ,&nbsp;₽</th><th>Экономия от увеличения производительности,&nbsp;₽</th></tr>',
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
