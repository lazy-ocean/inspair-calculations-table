export const formatChunkTimestamp = (num, caseID) => {
  const CASES = {
    years: ["год", "года", "года", "года", "лет"],
    months: ["месяц", "месяца", "месяца", "месяца", "месяцев"],
  };
  const index =
    //prettier-ignore
    num % 100 > 4 && num % 100 <= 20
      ? 4
      : num % 10 < 5
      ? (num % 10) - 1
      : 4;
  return num !== 0 ? `${num}&nbsp;${CASES[caseID][index]}` : "";
};
