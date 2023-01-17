import * as yup from "yup"

export const addRoomSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Name is too long.")
    .required("This field is required!"),
  capacity: yup.number().required("This field is required!"),
})
