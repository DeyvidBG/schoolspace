import { FC, useRef } from "react"
import { useInView } from "framer-motion"
import styles from "./styles.module.css"
import { useMediaQuery } from "@mui/material"
import Typography from "../../atoms/Typography"

interface ILeftBoxProps {
  icon: React.ReactNode
  text: string
}

const LeftBox: FC<ILeftBoxProps> = ({ icon, text }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const matches = useMediaQuery("(max-width: 768px)")

  return (
    <div
      ref={ref}
      style={{
        width: matches ? "75%" : "42%",
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        flex: `1 1 ${matches ? "75%" : "42%"}`,
      }}
      className={styles.infoBox}
    >
      <div className={styles.iconBox}>{icon}</div>
      <Typography
        variant="subheading1"
        style={{ color: "white", width: "80%" }}
      >
        {text}
      </Typography>
    </div>
  )
}

export default LeftBox
