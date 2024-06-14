// REF: https://demo.react.email/preview/welcome/koala-welcome?view=desktop&lang=jsx
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { format } from "date-fns"
import * as React from "react"
import { siteConfig } from "@/config/site"

interface ReminderBookingEmailProps {
  bookingId: string
  eventTitle: string
  // eventImage: string
  bookingTime: Date
  bookingConfirmed: boolean
  bookingPaid: boolean
  userName: string
  paidAmount?: number | null
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "/"

export const ReminderBookingEmail = ({
  bookingId,
  eventTitle,
  // eventImage,
  bookingTime,
  bookingConfirmed,
  bookingPaid,
  paidAmount,
  userName,
}: ReminderBookingEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Reminder: Booking for {eventTitle} by {userName}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {userName},</Text>
        <Text style={paragraph}>Reminder: Booking for {eventTitle}.</Text>
        <Text style={paragraph}>
          <b>Event: </b>
          {eventTitle}
        </Text>
        <Text style={paragraph}>
          <b>Time: </b>
          {format(bookingTime, "PPP p")}
        </Text>
        <Text style={paragraph}>
          <b>User: </b>
          {userName}
        </Text>
        <Text style={paragraph}>
          <b>Confirmed: </b>
          {bookingConfirmed ? "Yes" : "No"}
        </Text>
        <Text style={paragraph}>
          <b>Paid: </b>
          {bookingPaid ? "Yes" : "No"} ({paidAmount ? `$${paidAmount}` : ""})
        </Text>
        <Text style={paragraph}>
          Reach our Admin team in case of any concerns.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/bookings/${bookingId}/edit`}>
            View Booking
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Wishes,
          <br />
          The Amman Admin Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>{siteConfig.address}</Text>
      </Container>
    </Body>
  </Html>
)

ReminderBookingEmail.PreviewProps = {
  eventTitle: "Alan",
} as ReminderBookingEmailProps

export default ReminderBookingEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const btnContainer = {
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}