import React, { FC } from "react"
import PropTypes from "prop-types"
import styles from "./styles.module.css"

type SizeType = "sm" | "md" | "lg" | "xl"

interface IAvatarProps {
  img: string
  size: SizeType
}

const Avatar: FC<IAvatarProps> = ({ img, size }) => {
  return (
    <img
      src={img}
      alt="Avatar"
      className={`${styles.avatar} ${styles[size]}`}
    />
  )
}

Avatar.propTypes = {
  img: PropTypes.string.isRequired,
  size: PropTypes.oneOf<SizeType>(["sm", "md", "lg", "xl"]).isRequired,
}

export default Avatar
