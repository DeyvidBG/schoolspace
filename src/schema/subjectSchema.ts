import * as yup from "yup"

export const subjectSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Name of subject is too long.")
    .required("Name of subject is required."),
  description: yup
    .string()
    .max(1000, "Description is too long.")
    .required("Description is required."),
})
