import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function formatSubmittedAt() {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  const submittedAt = formatSubmittedAt();

  return (
    <Html>
      <Head />

      <Preview>New Portfolio Contact from {name}</Preview>

      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily:
            "Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
          margin: 0,
          padding: "40px 20px",
        }}
      >
        <Container
          style={{
            maxWidth: "640px",
            backgroundColor: "#ffffff",
            margin: "0 auto",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}

          <Section
            style={{
              backgroundColor: "#111827",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                margin: 0,
                fontSize: "28px",
              }}
            >
              New Portfolio Contact
            </Heading>

            <Text
              style={{
                color: "#9ca3af",
                marginTop: "8px",
              }}
            >
              Someone contacted you through your portfolio.
            </Text>
          </Section>

          <Section style={{ padding: "32px" }}>
            <Info title="Name" value={name} />

            <Info title="Email" value={email} isLink />

            <Info title="Subject" value={subject} />

            <Hr />

            <Heading
              as="h2"
              style={{
                fontSize: "20px",
                color: "#111827",
              }}
            >
              Message
            </Heading>

            <Text
              style={{
                whiteSpace: "pre-wrap",
                color: "#374151",
                lineHeight: "1.8",
                fontSize: "15px",
              }}
            >
              {message}
            </Text>

            <Hr />

            <Text
              style={{
                color: "#9ca3af",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <strong>Submitted:</strong> {submittedAt}
              <br />
              <Link href="https://your-portfolio.vercel.app" style={{ color: "#2563EB", textDecoration: "none" }}>
                Portfolio Website
              </Link>
              <br />
              Generated automatically via Portfolio Contact Form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Info({
  title,
  value,
  isLink = false,
}: {
  title: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <>
      <Heading
        as="h3"
        style={{
          fontSize: "15px",
          marginBottom: "4px",
          color: "#6b7280",
        }}
      >
        {title}
      </Heading>

      {isLink ? (
        <Link
          href={`mailto:${value}`}
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#2563EB",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          {value}
        </Link>
      ) : (
        <Text
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#111827",
            fontSize: "16px",
          }}
        >
          {value}
        </Text>
      )}
    </>
  );
}