import React from "react"

export interface IComponentProps {
  className?: string
  style?: {}
  contentEditable: boolean
  children: React.ReactNode
}

export type ColorOptions = "primary" | "secondary" | "info" | "error"

export interface IVisual {
  variant: string
  color?: ColorOptions
  children?: React.ReactNode
}
