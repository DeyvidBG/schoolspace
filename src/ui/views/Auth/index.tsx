import { FC } from "react"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.css"

interface IAuthProps {}

const Auth: FC<IAuthProps> = () => {
  return (
    <div className={styles.main}>
      <Outlet />
    </div>
  )
}

export default Auth
