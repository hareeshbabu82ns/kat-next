"use client"
import Link from "next/link"
import React from "react"

const ErrorPage = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">
            500
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-muted-foreground md:text-4xl">
            Internal Server Error
          </p>
          <p className="mb-4 text-lg font-light text-muted-foreground">
            We are already working to solve the problem
          </p>
          <Link
            className="mb-4 text-lg font-light text-blue-700 dark:text-blue-300"
            href="/"
          >
            Go back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
