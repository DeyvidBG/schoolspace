import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import router from "./App"
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./provider/AuthProvider"
import "./index.css"
import { MessageBoxProvider } from "./provider/MessageBoxProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MessageBoxProvider>
        <RouterProvider router={router} />
      </MessageBoxProvider>
    </AuthProvider>
  </React.StrictMode>
)

reportWebVitals()
