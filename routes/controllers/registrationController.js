import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ render, request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = { email: params.get("email"), password: params.get("password") };
  const [passes, errors] = await validasaur.validate(data, registrationValidationRules);

  if (!passes) {
    data.validationErrors = errors;
    render("registration.eta", data);
  } else {
    await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
    );

    response.redirect("/auth/login");
  }
  
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };