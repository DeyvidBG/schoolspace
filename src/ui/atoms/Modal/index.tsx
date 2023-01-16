import { FC, useState } from "react"
import { motion } from "framer-motion"
import styles from "./styles.module.css"
import CloseIcon from "@mui/icons-material/Close"

interface IModalProps {
  onClick: () => void
  children: React.ReactNode
}

const Modal: FC<IModalProps> = ({ onClick, children }) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <>
      <div className={styles.overlay}>
        <motion.div
          initial={{ y: 150, scale: 0 }}
          animate={{ y: 0, scale: 1, rotate: 360 }}
          transition={{ stiffness: 50, delay: 1 }}
          className={styles.closeButton}
          onClick={handleClick}
        >
          <CloseIcon />
        </motion.div>
        <motion.div
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          transition={{ stiffness: 50 }}
          className={styles.modal}
        >
          {children}
        </motion.div>
      </div>
    </>
  )
}

export default Modal
