export const plural = (years, months) => {
  let text = "Срок окупаемости&nbsp;– ";
  const casesY = ["год", "года", "года", "года", "лет"];
  let indexY =
    years % 100 > 4 && years % 100 <= 20
      ? 4
      : years % 10 < 5
      ? (years % 10) - 1
      : 4;
  text += years !== 0 ? `${years}&nbsp;${casesY[indexY]} ` : "";

  const casesM = ["месяц", "месяца", "месяца", "месяца", "месяцев"];
  let indexM =
    months % 100 > 4 && months % 100 <= 20
      ? 4
      : months % 10 < 5
      ? (months % 10) - 1
      : 4;
  text += months !== 0 ? `${months}&nbsp;${casesM[indexM]}` : "";

  return text;
};
