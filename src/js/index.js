import makeForm from "./form";

makeForm();

const infobtn = document.querySelector(".information--btn");
const infotxt = document.querySelector(".information--text");
infobtn.addEventListener("click", () => {
  infotxt.classList.toggle("is-visible");
});
