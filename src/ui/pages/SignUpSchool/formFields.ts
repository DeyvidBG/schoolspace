import { Field } from "../../../model/shared-types"

const formFields: Field[] = [
  {
    fieldName: "name",
    placeholder: "Name",
    type: "text",
  },
  {
    fieldName: "welcomeText",
    placeholder: "Welcome Text",
    type: "text",
  },
  {
    fieldName: "principalEmail",
    placeholder: "Principal's Email",
    type: "email",
  },
  {
    fieldName: "vicePrincipalEmail",
    placeholder: "Vice Principal's Email",
    type: "email",
  },
  { fieldName: "country", placeholder: "Country", type: "text" },
  { fieldName: "city", placeholder: "City", type: "text" },
  { fieldName: "zipCode", placeholder: "Zip code", type: "text" },
  { fieldName: "streetAddress", placeholder: "Street address", type: "text" },
  { fieldName: "website", placeholder: "Website", type: "text" },
]

export default formFields
