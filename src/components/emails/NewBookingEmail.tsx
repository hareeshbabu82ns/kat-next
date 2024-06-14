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

interface NewBookingEmailProps {
  bookingId: string
  eventTitle: string
  // eventImage: string
  bookingTime: Date
  userName: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "/"

export const NewBookingEmail = ({
  bookingId,
  eventTitle,
  // eventImage,
  bookingTime,
  userName,
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
          {format(bookingTime, "PPP HH:mm")}
        </Text>
        <Text style={paragraph}>
          <b>User: </b>
          {userName}
        </Text>
        <Text style={paragraph}>
          Our Admin team will connect with you shortly to confirm.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/booking/${bookingId}/edit`}>
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

NewBookingEmail.PreviewProps = {
  eventTitle: "Alan",
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
