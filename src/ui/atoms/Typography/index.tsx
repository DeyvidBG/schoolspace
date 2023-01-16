import React, { FC } from "react"
import { IComponentProps, IVisual, ColorOptions } from "../utils/shared-types"
import PropTypes from "prop-types"
import styles from "./styles.module.css"

const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
}

interface ITypographyProps extends IVisual {
  style?: {}
  contentEditable?: boolean
}

const Typography: FC<ITypographyProps> = ({
  variant,
  color,
  style,
  contentEditable = false,
  children,
  ...props
}) => {
  const Component = (variant
    ? variantsMapping[variant as keyof typeof variantsMapping]
    : "p") as unknown as FC<IComponentProps>

  return (
    <Component
      className={`${styles[`variant-${variant}`]} ${
        color ? styles[`color-${color}`] : ""
      }`}
      style={{ ...style }}
      contentEditable={contentEditable}
      {...props}
    >
      {children}
    </Component>
  )
}

Typography.propTypes = {
  variant: PropTypes.string.isRequired,
  color: PropTypes.oneOf<ColorOptions>([
    "primary",
    "secondary",
    "info",
    "error",
  ]),
  children: PropTypes.node.isRequired,
}

export default Typography
