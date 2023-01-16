import { FC } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import styles from "./styles.module.css"

interface ISelectFieldProps {
  fieldName: string
  register: UseFormRegister<FieldValues>
  placeholder: string
  isRequired?: boolean
  options: { id: number; value: string }[]
  disabled?: boolean
  style?: {}
}

const SelectField: FC<ISelectFieldProps> = ({
  fieldName,
  register,
  placeholder,
  isRequired = true,
  options,
  disabled = false,
  style = {},
}) => {
  return (
    <div className={styles.wrapper} style={style}>
      <select
        placeholder={placeholder}
        required={isRequired}
        {...register(fieldName)}
        className={styles.input}
        style={{ width: "100%" }}
      >
        {options.map((e) => (
          <option value={e.id} key={e.id}>
            {e.value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
