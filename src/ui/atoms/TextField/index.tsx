import { FC, useEffect, useState } from "react"
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form"
import styles from "./styles.module.css"

interface ITextFieldProps {
  fieldName: string
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  type: string
  placeholder: string
  disabled?: boolean
  style?: {}
}

const TextInput: FC<ITextFieldProps> = ({
  fieldName,
  register,
  errors,
  type,
  placeholder,
  disabled = false,
  style = {},
}) => {
  const [error, setError] = useState<
    string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  >("")

  useEffect(() => {
    if (errors[fieldName]?.message) {
      setError(`🖕 ${errors[fieldName]?.message}`)
    } else {
      setError(undefined)
    }
  }, [errors, fieldName])

  return (
    <div className={styles.wrapper} style={{ ...style }}>
      <input
        placeholder={placeholder}
        type={type}
        {...register(fieldName)}
        className={styles.input}
        style={{ width: "100%" }}
        disabled={disabled}
      />
      {error && <p>{error.toString()}</p>}
    </div>
  )
}

export default TextInput
