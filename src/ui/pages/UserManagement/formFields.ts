import { Field, Role } from "../../../model/shared-types"

export const filterFields: Field[] = [
  {
    fieldName: "role",
    placeholder: "Filter by Role",
    type: "select",
    options: [
      { id: 0, value: "No filter" },
      { id: Role.User, value: "User" },
      { id: Role.Student, value: "Student" },
      { id: Role.Parent, value: "Parent" },
      { id: Role.Teacher, value: "Teacher" },
      { id: Role.Principal, value: "Principal" },
      { id: Role.Admin, value: "Admin" },
    ],
  },
]

export const editUserFields: Field[] = [
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
    disabled: true,
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
  {
    fieldName: "role",
    placeholder: "Role",
    type: "select",
    options: [
      { id: Role.User, value: "User" },
      { id: Role.Student, value: "Student" },
      { id: Role.Parent, value: "Parent" },
      { id: Role.Teacher, value: "Teacher" },
      { id: Role.Principal, value: "Principal" },
      { id: Role.Admin, value: "Admin" },
    ],
  },
]
