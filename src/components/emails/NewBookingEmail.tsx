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
import { formatPhoneNumber } from "@/lib/utils"

interface NewBookingEmailProps {
  bookingId: string
  eventTitle: string
  // eventImage: string
  bookingTime: Date
  userName: string
  isConfirmed?: boolean
  bookingPaid: boolean
  paidAmount?: number | null
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "/"

export const NewBookingEmail = ({
  bookingId,
  eventTitle,
  // eventImage,
  bookingTime,
  userName,
  isConfirmed = false,
  bookingPaid,
  paidAmount,
}: NewBookingEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Booking for {eventTitle} by {userName}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {userName},</Text>
        <Text style={paragraph}>Booking for {eventTitle} submitted.</Text>
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
          {isConfirmed ? "Yes" : "No"}
        </Text>
        <Text style={paragraph}>
          <b>Paid: </b>
          {bookingPaid ? "Yes" : "No"} ({paidAmount ? `$${paidAmount}` : ""})
        </Text>
        {isConfirmed ? (
          <Text style={paragraph}>
            Booking is confirmed, please reach out to Admin team for any further
            details.
          </Text>
        ) : (
          <Text
            style={{ ...paragraph, color: "orange", textEmphasis: "Highlight" }}
          >
            Note: This is a booking request only not the confirmation. Our Admin
            team will connect with you shortly to confirm.
          </Text>
        )}
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
        <Text style={footer}>{formatPhoneNumber(siteConfig.links.tel)}</Text>
      </Container>
    </Body>
  </Html>
)

NewBookingEmail.PreviewProps = {
  bookingId: "333",
  eventTitle: "Pooja Name",
  // eventImage,
  bookingTime: new Date(),
  userName: "User Name",
  isConfirmed: false,
  bookingPaid: false,
  paidAmount: 33,
} as NewBookingEmailProps

export default NewBookingEmail

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
