// @go-irl/contracts — Auth (Telegram initData verification)
import type { User } from "@go-irl/types"

export interface TelegramAuthRequest {
  initData: string // raw initData string from window.Telegram.WebApp.initData
}

export interface TelegramAuthResponse {
  user: User
  token: string // JWT for subsequent requests
}
