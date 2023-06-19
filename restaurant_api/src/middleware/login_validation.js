import Joi from "joi";

// validation data
const validate_data = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .max(20)
    .required(),
});
const validate_user = (userData) => {
  return validate_data.validate(userData);
};

export default validate_user;
