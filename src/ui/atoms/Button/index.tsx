import React, { FC } from "react"
import { IVisual, ColorOptions } from "../utils/shared-types"
import PropTypes from "prop-types"
import styles from "./styles.module.css"

type ButtonType = "button" | "submit" | "reset"

interface IButtonProps extends IVisual {
  type: ButtonType
  disabled?: boolean
  onClick?: () => void | Promise<void> | undefined
  width?: string
  style?: {}
  children: React.ReactNode
}

const Button: FC<IButtonProps> = ({
  type,
  variant,
  color,
  disabled = false,
  onClick = () => {},
  width,
  style = {},
  children,
  ...props
}) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={{ width: width ? width : "auto", ...style }}
      className={`${styles.button} ${styles[`${variant}`]} ${
        styles[`${variant}--${color}`]
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf<ButtonType>(["button", "submit", "reset"]).isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.oneOf<ColorOptions>([
    "primary",
    "secondary",
    "info",
    "error",
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  width: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.any,
}

export default Button
