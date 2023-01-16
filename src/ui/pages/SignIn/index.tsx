import { FC } from "react"
import { useForm } from "react-hook-form"
import { Button, FlexBox, TextField, Typography } from "../../atoms"
import { User } from "../../../model/User"
import { useMediaQuery } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import MessageBox from "../../molecules/MessageBox"
import { useAuth } from "../../../provider/AuthProvider"
import { useNavigate } from "react-router-dom"
import { userSignInSchema } from "../../../schema"
import styles from "./styles.module.css"
import { Role } from "../../../model/shared-types"
import { useMessageBox } from "../../../provider/MessageBoxProvider"
import { fields } from "./formFields"

interface ISignInProps {}

const SignIn: FC<ISignInProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSignInSchema) })
  const matches = useMediaQuery("(max-width: 768px)")
  const { showMessage, hideMessage } = useMessageBox()
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: Partial<User>) => {
    const response = await fetch("http://localhost:8000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const responseData: {
      code: number
      msg: string
      payload?: unknown
      jwt: string
    } = await response.json()
    showMessage(responseData.code, responseData.msg)
    const userData = responseData.payload as User
    signIn(userData, userData.role, () => {
      sessionStorage.setItem("jwt", responseData.jwt)
      if (userData.role === Role.User) {
        setTimeout(() => {
          hideMessage()
          navigate("/lobby")
        }, 1000)
      } else if (userData.role === Role.Principal) {
        setTimeout(() => {
          hideMessage()
          navigate("/school/subjects")
        })
      } else if (userData.role === Role.Admin) {
        setTimeout(() => {
          hideMessage()
          navigate("/admin/users")
        }, 1000)
      }
    })
  }

  return (
    <div className={styles.signIn}>
      <FlexBox
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        style={{ position: "relative", width: "100%" }}
      >
        <Typography variant="h2" style={{ fontFamily: "Varino" }}>
          SIGN IN
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
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{ flexFlow: "column nowrap" }}
          >
            {fields.map((e) => (
              <TextField
                fieldName={e.fieldName}
                placeholder={e.placeholder}
                type={e.type}
                register={register}
                key={e.fieldName}
                errors={errors}
                style={{
                  flex: "0 0 40%",
                  width: `${matches ? "95%" : "40%"}`,
                }}
              />
            ))}
          </FlexBox>
          <Button
            variant="outlined"
            type="submit"
            width={matches ? "95%" : "25%"}
            color="primary"
            style={{ alignSelf: "center" }}
          >
            Sign In
          </Button>
        </form>
        <MessageBox style={{ width: matches ? "95%" : "25%" }} />
      </FlexBox>
    </div>
  )
}

export default SignIn
