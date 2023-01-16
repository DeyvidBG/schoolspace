import { FC } from "react"
import FlexBox from "../../atoms/FlexBox"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CloseIcon from "@mui/icons-material/Close"
import styles from "./styles.module.css"
import { useMessageBox } from "../../../provider/MessageBoxProvider"

export type MessageBoxVariants = "success" | "info" | "warning" | "error"

export interface IMessageBoxProps {
  style?: {}
}

const iconTypes = [
  {
    type: "success",
    icon: <CheckCircleOutlineIcon />,
  },
  {
    type: "info",
    icon: <HelpOutlineIcon />,
  },
  {
    type: "warning",
    icon: <ReportGmailerrorredIcon />,
  },
  {
    type: "error",
    icon: <ErrorOutlineIcon />,
  },
]

const MessageBox: FC<IMessageBoxProps> = ({ style = {} }) => {
  const { isVisible, message, variant, hideMessage } = useMessageBox()

  const hide = () => {
    hideMessage()
  }

  return (
    <div
      className={`${styles.messageBox} ${styles[variant]} ${
        styles[isVisible ? "visible" : "hidden"]
      }`}
      style={{ ...style }}
    >
      <FlexBox>
        <FlexBox>
          {iconTypes.filter((iconType) => iconType.type === variant)[0].icon}
          {message}
        </FlexBox>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={hide} />
      </FlexBox>
    </div>
  )
}

export default MessageBox
