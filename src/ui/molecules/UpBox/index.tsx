import { FC, useRef } from "react"
import { motion, useInView } from "framer-motion"
import styles from "./styles.module.css"
import { useMediaQuery } from "@mui/material"

interface IUpBoxProps {
  children: React.ReactNode
}

const UpBox: FC<IUpBoxProps> = ({ children }) => {
  const ref = useRef(null)
  const matches = useMediaQuery("(max-width: 768px)")
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      {children}
    </motion.div>
  )
}

export default UpBox
