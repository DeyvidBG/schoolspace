import { FC } from "react"
import Typography from "../../atoms/Typography"
import FlexBox from "./../../atoms/FlexBox/index"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import styles from "./styles.module.css"

interface ITaskProps {}

const Task: FC<ITaskProps> = () => {
  return (
    <div className={styles.task}>
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FlexBox flexDirection="row" alignItems="flex-start">
          <Typography variant="h6">9:00</Typography>
          <FlexBox
            flexDirection="column"
            alignItems="flex-start"
            style={{ margin: "0rem 1rem" }}
          >
            <Typography variant="h6">Chemistry</Typography>
            <Typography variant="body2">Homework: ...</Typography>
          </FlexBox>
        </FlexBox>
        <ArrowForwardIosIcon />
      </FlexBox>
    </div>
  )
}

export default Task
