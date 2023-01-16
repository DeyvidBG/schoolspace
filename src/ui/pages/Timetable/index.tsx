import { FC } from "react"
import Container from "../../atoms/Container"
import styles from "./styles.module.css"
import Typography from "./../../atoms/Typography"
import FlexBox from "./../../atoms/FlexBox"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

interface ITimetableProps {}

const Timetable: FC<ITimetableProps> = () => {
  return (
    <Container>
      <div className={styles.header}>
        <ArrowBackIosIcon />
        <FlexBox flexDirection="row" alignItems="center">
          <Typography variant="h6">26th of January, Tuesday</Typography>
        </FlexBox>
        <ArrowForwardIosIcon />
      </div>
    </Container>
  )
}

export default Timetable
