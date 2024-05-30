"use client"
import Link from "next/link"
import React from "react"

const ErrorPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center ">
      <div className="text-lg font-semibold text-destructive">
        500 - Unhandled Error
      </div>
      <Link href="/">Go back to home</Link>
    </div>
  )
}

export default ErrorPage
