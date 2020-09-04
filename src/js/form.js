import { CLASSNAMES } from "./constants";
import calculator from "./calculator";
import makeTable from "./table";
import { plural } from "./utils";

const { schema, validate, calculate, calculatePayback } = calculator;

export default () => {
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
    let label = createElementFromHTML(
      `<label class="form__label" for="${item}">${name}</label>`
    );
    let element = createElementFromHTML(`<input ${attrs} /><br />`);
    let output = createElementFromHTML(
      `<output class="form__bubble form__bubble--${item}"></output>`
    );
    let scale = createElementFromHTML(
      `<div class="form__minmax"><span>${value.min.toLocaleString(
        "ru"
      )}</span><span>${value.max.toLocaleString("ru")}</span></div>`
    );
    return { item, element, label, output, scale };
  });

  nodes.forEach((node) => {
    form.append(
      createElementFromHTML(
        `<div class= 'form__item form__item--${node.item}'></div>`
      )
    );
    const item = document.querySelector(`.form__item--${node.item}`);
    item.append(node.label);

    item.append(
      createElementFromHTML(
        `<div class= 'form__scale form__scale--${node.item}'></div>`
      )
    );
    const formScale = document.querySelector(`.form__scale--${node.item}`);
    formScale.append(node.element);
    formScale.append(node.output);
    formScale.append(node.scale);
    //form.append(node.label);
    //form.append(node.element);
    //form.append(node.output);
  });

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

    const paybackData = calculatePayback(result);
    const payback = createElementFromHTML(
      `<p class="payback">${
        paybackData
          ? plural(paybackData.paybackYears, paybackData.paybackMonths)
          : "Проект не окупается"
      }</p>`
    );
    const tbl = createElementFromHTML(
      `<section class="result">${makeTable(
        result,
        paybackData
          ? paybackData.paybackYears - (paybackData.paybackMonths === 0 ? 1 : 0)
          : null
      )}</section>`
    );

    const resultTable = document.querySelector(".result");
    if (resultTable) resultTable.remove();

    const resultPayback = document.querySelector(".payback");
    if (resultPayback) resultPayback.remove();
    const container = document.body.querySelector(".container");
    container.append(payback);
    container.append(tbl);
    const resultDiv = document.querySelector(".result");
    const info = document.querySelector(".information");
    container.append(info);
    info.classList.add("is-visible");
    payback.scrollIntoView();
  };

  form.addEventListener("submit", onSubmit, true);

  ////// BUBBLES FOR THE FORM
  const allScales = document.querySelectorAll(".form__item");
  allScales.forEach((item) => {
    const scale = item.querySelector(".form__field");
    const bubble = item.querySelector(".form__bubble");

    scale.addEventListener("input", () => {
      setBubble(scale, bubble);
    });
    setBubble(scale, bubble);
  });

  function setBubble(scale, bubble) {
    const value = ~~scale.value;
    const min = scale.min;
    const max = scale.max;
    const newValue = Number(((value - min) * 100) / (max - min));
    bubble.innerHTML = value.toLocaleString("ru");
    bubble.style.left = `calc(${newValue}% + (${10 - newValue * 0.15}px))`;
  }
};
