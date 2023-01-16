import { Field } from "../../../model/shared-types"

export const formFields: Field[] = [
  {
    fieldName: "firstName",
    placeholder: "First name",
    type: "text",
  },
  {
    fieldName: "middleName",
    placeholder: "Middle name",
    type: "text",
  },
  {
    fieldName: "lastName",
    placeholder: "Last name",
    type: "text",
  },
  {
    fieldName: "email",
    placeholder: "Email",
    type: "text",
  },
  {
    fieldName: "password",
    placeholder: "Password",
    type: "password",
  },
  {
    fieldName: "phoneNumber",
    placeholder: "Phone number",
    type: "text",
  },
  {
    fieldName: "birthDate",
    placeholder: "Birth date",
    type: "date",
  },
  {
    fieldName: "gender",
    placeholder: "Gender",
    type: "select",
    options: [
      { id: 1, value: "Man" },
      { id: 2, value: "Woman" },
    ],
  },
]
