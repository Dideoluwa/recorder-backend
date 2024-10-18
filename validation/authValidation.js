const yup = require("yup");

const registrationSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginSchema = yup.object({
  identifier: yup.string().required("Username or email is required"),
  password: yup.string().required("Password is required"),
});

module.exports = {
  registrationSchema,
  loginSchema,
};
