import React, { FC } from "react"
import PropTypes from "prop-types"

type FlexBoxType = "row" | "row-reverse" | "column" | "column-reverse"

interface IFlexBoxProps {
  flexDirection?: FlexBoxType
  alignItems?: string
  justifyContent?: string
  style?: {}
  children: React.ReactNode
}

const FlexBox: FC<IFlexBoxProps> = ({
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "space-between",
  style = {},
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: flexDirection,
        alignItems: alignItems,
        justifyContent: justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

FlexBox.propTypes = {
  flexDirection: PropTypes.oneOf<FlexBoxType>([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ]),
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.any,
}

export default FlexBox
