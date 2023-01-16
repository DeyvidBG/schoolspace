import { FC } from "react"
import {
  Button,
  FlexBox,
  SelectField,
  TextField,
  Typography,
} from "../../atoms"
import styles from "./styles.module.css"
import { useForm } from "react-hook-form"
import { User } from "../../../model/User"
import { useMediaQuery } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import MessageBox from "../../molecules/MessageBox"
import { useMessageBox } from "../../../provider/MessageBoxProvider"
import { formFields } from "./formFields"
import { userSignUpSchema } from "../../../schema"

interface ISignUpProps {}

const SignUp: FC<ISignUpProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSignUpSchema) })
  const matches = useMediaQuery("(max-width: 768px)")
  const { showMessage } = useMessageBox()

  const onSubmit = async (userData: Partial<User>) => {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    const responseData: { code: number; msg: string; payload?: unknown } =
      await response.json()
    showMessage(responseData.code, responseData.msg)
  }

  return (
    <div className={styles.signUp}>
      <FlexBox
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        style={{ position: "relative", width: "100%" }}
      >
        <Typography variant="h2" style={{ fontFamily: "Varino" }}>
          SIGN UP
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {formFields.map((field) =>
              field.type === "select" ? (
                <SelectField
                  fieldName={field.fieldName}
                  placeholder={field.placeholder}
                  register={register}
                  isRequired={true}
                  options={field.options!}
                />
              ) : (
                <TextField
                  fieldName={field.fieldName}
                  placeholder={field.placeholder}
                  type={field.type}
                  register={register}
                  key={field.fieldName}
                  errors={errors}
                />
              )
            )}
          </div>
          <Button
            variant="outlined"
            type="submit"
            width={matches ? "95%" : "25%"}
            color="primary"
            style={{ alignSelf: "center" }}
          >
            Sign Up
          </Button>
        </form>
        <MessageBox style={{ width: matches ? "95%" : "25%" }} />
      </FlexBox>
    </div>
  )
}

export default SignUp
