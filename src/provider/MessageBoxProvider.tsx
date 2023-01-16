import { createContext, useContext, useMemo, useState } from "react"
import { MessageBoxVariants } from "../ui/molecules/MessageBox"

interface MessageBoxContextType {
  isVisible: boolean
  variant: Partial<MessageBoxVariants>
  message: string
  showMessage: (code: number, message: string) => void
  hideMessage: () => void
}

const variants: Partial<MessageBoxVariants>[] = [
  "success",
  "info",
  "warning",
  "error",
]

const MessageBoxContext = createContext<MessageBoxContextType>(null!)

export const MessageBoxProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [variant, setVariant] = useState<Partial<MessageBoxVariants>>("success")

  const showMessage = (code: number, message: string) => {
    setIsVisible(true)
    setMessage(message)
    setVariant(variants[code - 1])
  }

  const hideMessage = () => {
    setIsVisible(false)
  }

  let value = useMemo(
    () => ({ isVisible, message, variant, showMessage, hideMessage }),
    [isVisible, message, variant]
  )

  return (
    <MessageBoxContext.Provider value={value}>
      {children}
    </MessageBoxContext.Provider>
  )
}

export const useMessageBox = () => {
  return useContext(MessageBoxContext)
}
