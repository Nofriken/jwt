import Joi from "joi";

const validate_data = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(5)
    .max(15)
    .required(),
});

const validation = (user_data) => {
  return validate_data.validate(user_data);
};

export default validation;
