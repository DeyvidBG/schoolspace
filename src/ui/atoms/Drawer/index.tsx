import React, { FC } from "react"
import PropTypes from "prop-types"
import styles from "./styles.module.css"

interface IDrawerProps {
  visible: boolean
  children: React.ReactNode
  style?: {}
}

const Drawer: FC<IDrawerProps> = ({ visible, children, style, ...props }) => {
  return (
    <div
      className={styles.drawer}
      style={{
        display: visible ? "flex" : "none",
        flexDirection: "column",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

Drawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.any,
}

export default Drawer
