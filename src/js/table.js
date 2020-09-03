export default (tableArr) => {
  let table = [
    '<table id="resultTable"><tr><th>Год</th><th>Ежегодный кэш-флоу,&nbsp;₽</th><th>Суммарный кэш-флоу,&nbsp;₽</th><th>Вложения,&nbsp;₽</th><th>Обслуживание,&nbsp;₽</th><th>Операционные расходы,&nbsp;₽</th><th>Экономия ФОТ,&nbsp;₽</th><th>Экономия от увеличения производительности,&nbsp;₽</th></tr>',
  ];
  for (let item of tableArr) {
    //prettier-ignore
    const { year, investments, maintenance, operational, salarySaved, performanceSaved, cashflowYear, cashflow } = item;
    //prettier-ignore
    let str = [year, cashflowYear, cashflow, investments, maintenance, operational, salarySaved, performanceSaved]
      .map((column) => `<td>${column.toLocaleString("ru")}</td>`)
      .join("");
    table.push(`<tr>${str}</tr>`);
  }
  table.push("</table>");
  let HTMLtable = table.join("");
  return HTMLtable;
};
