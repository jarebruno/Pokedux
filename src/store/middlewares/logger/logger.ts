import { Middleware } from "@reduxjs/toolkit"

export const loggerMiddleware: Middleware = (storeApi) => (next) => (action) => {
  console.log(storeApi.getState())
  next(action)
  console.log(storeApi.getState())
}