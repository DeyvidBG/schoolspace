import { Field } from "../../../model/shared-types"

export const addRoomFields: Field[] = [
  {
    fieldName: "name",
    placeholder: "Name",
    type: "text",
  },
  { fieldName: "capacity", placeholder: "Capacity", type: "number" },
]
