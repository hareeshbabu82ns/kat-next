"use client"
import { LockKeyholeIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInEmail } from "@/lib/auth/actions"

export default function LoginForm() {
  const [email, setEmail] = useState("")

  return (
    <Card className="min-w-lg m-auto rounded-lg p-2 md:min-w-[500px]">
      <CardHeader>
        <div className="flex items-center justify-center pb-2">
          <Avatar className="size-16">
            <AvatarImage src="/icon-192.png" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          eMail login currently only supported on browsers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              const res = await signInEmail(email)
              console.log("signInEmail", res)
            }}
          >
            Login with Email
          </Button>
          {/* divider */}
          <div className="flex w-full items-center py-4">
            <div className="h-px flex-1 bg-primary" />
            <span className="px-2 text-sm text-primary">
              <LockKeyholeIcon className="size-4" />
            </span>
            <div className="h-px flex-1 bg-primary" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  )
}
