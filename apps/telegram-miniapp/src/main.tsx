import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        initData: string
      }
    }
  }
}

if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready()
  window.Telegram.WebApp.expand()
  window.Telegram.WebApp.setHeaderColor("#0A0A0A")
  window.Telegram.WebApp.setBackgroundColor("#0A0A0A")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
