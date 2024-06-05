"use server"

import { signIn as naSignIn, signOut as naSignOut } from "."

export const signIn = async () => {
  return naSignIn()
}

export const signOut = async () => {
  return naSignOut()
}
