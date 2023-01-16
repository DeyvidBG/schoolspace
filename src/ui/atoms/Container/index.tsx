import { FC } from "react"

interface IContainerProps {
  children: React.ReactNode
}

const Container: FC<IContainerProps> = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      {children}
    </div>
  )
}

export default Container
