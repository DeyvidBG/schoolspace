import { FC, useEffect } from "react"
import { motion } from "framer-motion"
import Typography from "./../../atoms/Typography/index"
import styles from "./styles.module.css"
import FlexBox from "../../atoms/FlexBox"
import Button from "../../atoms/Button"
import AutoGraphIcon from "@mui/icons-material/AutoGraph"
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner"
import BrushIcon from "@mui/icons-material/Brush"
import PeopleIcon from "@mui/icons-material/People"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@mui/material"
import { LeftBox, UpBox } from "../../molecules"

interface IMainProps {}

const infoBoxes = [
  {
    icon: <AutoGraphIcon />,
    text: "An online school diary can help you stay on top of your responsibilities and deadlines by providing alerts and reminders for upcoming assignments, tests, and other important dates. This can help you avoid last-minute cramming and reduce stress.",
  },
  {
    icon: <DocumentScannerIcon />,
    text: "The ability to access and update your schedule and assignments from any device with an internet connection can be especially useful for students who are juggling multiple commitments or who need to coordinate with classmates or teachers.",
  },
  {
    icon: <BrushIcon />,
    text: "The online school diary can serve as a centralized hub for all your school-related information, including grades, attendance records, feedback from teachers, class notes, and homework assignments. This can make it easier to track your academic progress and identify areas where you may need extra support or attention.",
  },
  {
    icon: <PeopleIcon />,
    text: "In addition to providing a convenient way to organize and access your school-related information, an online school diary can also offer resources and tools to help you study and prepare for tests and exams. This can include practice quizzes, study guides, and other materials that can help you improve your knowledge and skills.",
  },
]

const Main: FC<IMainProps> = () => {
  const matches = useMediaQuery("(max-width: 1000px)")
  const navigate = useNavigate()

  useEffect(() => {})

  return (
    <div>
      <section className={styles.section}>
        <UpBox>
          <FlexBox flexDirection="column" style={{ width: "100%" }}>
            <Typography
              variant="h1"
              style={{ fontFamily: "Varino", color: "white", margin: "1rem 0" }}
            >
              SCHOOL SPACE
            </Typography>
            <FlexBox
              justifyContent="center"
              alignItems="center"
              style={{ width: "100%" }}
            >
              <Button
                variant="contained"
                type="button"
                color="primary"
                onClick={() => {
                  navigate("/auth/signin")
                }}
                width={matches ? "50%" : "10%"}
              >
                SIGN IN
              </Button>
            </FlexBox>
          </FlexBox>
        </UpBox>
      </section>
      <section className={styles.section}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: matches ? "90%" : "100%",
          }}
        >
          {infoBoxes.map((infoBox, index) => {
            return (
              <LeftBox icon={infoBox.icon} text={infoBox.text} key={index} />
            )
          })}
        </div>
      </section>
      <section className={styles.section}>
        <FlexBox flexDirection="column" style={{ width: "70%" }}>
          <UpBox>
            <Typography
              variant="h6"
              style={{ color: "white", textAlign: "justify" }}
            >
              Don't let disorganization and chaos hold you back from reaching
              your full potential! Our online school diary is here to help you
              take control of your academic life and achieve your goals. With
              features like customizable schedules, personalized reminders, and
              secure storage for your academic records, our app is the ultimate
              tool for staying on top of your responsibilities and making the
              most of your time in school. So why wait? Start using our app
              today and take the first step towards a brighter, more successful
              future!
            </Typography>
            <Button
              variant="contained"
              type="button"
              color="primary"
              onClick={() => {
                navigate("/auth/signin")
              }}
              width={matches ? "70%" : "30%"}
            >
              REQUEST SCHOOL DEMO
            </Button>
          </UpBox>
        </FlexBox>
      </section>
    </div>
  )
}

export default Main
