import schema from "./schema";

export default (values) => {
  let errors = {};
  Object.keys(values).forEach((item) => {
    if (schema[item].required && !values[item]) {
      errors[item] = "Пожалуйста, заполните поле";
    }
  });
  return errors;
};
