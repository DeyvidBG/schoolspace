import { FC } from "react"
import styles from "./styles.module.css"
import { useAuth } from "../../../provider/AuthProvider"
import Typography from "../../atoms/Typography"
import FlexBox from "../../atoms/FlexBox"
import Button from "../../atoms/Button"
import { useNavigate } from "react-router-dom"

interface ILobbyProps {}

const Lobby: FC<ILobbyProps> = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(() => {
      sessionStorage.removeItem("jwt")
      navigate("/auth/signin")
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.join}>
        <FlexBox flexDirection="column" style={{ width: "70%" }}>
          <Typography variant="h2">
            Hello {user?.firstName} {user?.lastName}!
          </Typography>
          <Typography variant="h6" style={{ textAlign: "justify" }}>
            Welcome to your personalized online school diary! To ensure a smooth
            experience for all users, you will initially be placed in a virtual
            lobby. This is to ensure that your role and access rights are
            properly set up. Rest assured that you will be directed to your
            designated area as soon as possible, where you will have the ability
            to manage and access your school related information with ease.
          </Typography>
          <Button
            type="button"
            variant="contained"
            color="error"
            width="25%"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </FlexBox>
      </div>
    </div>
  )
}

export default Lobby
