import makeForm from "./form";

makeForm();

const infobtn = document.querySelector(".information__btn");
const infotxt = document.querySelector(".information__text");
infobtn.addEventListener("click", () => {
  infotxt.classList.toggle("is-visible");
});
