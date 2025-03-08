import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        {/* Font component for custom fonts */}
        <Font family="Arial, sans-serif" />
        {/* Preview component for the subject line in the inbox */}
        <Preview>Verify Your Email Address</Preview>
      </Head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
          <Row>
            <Heading style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              Hello, {username}!
            </Heading>
          </Row>
          <Row>
            <Text style={{ fontSize: '16px', lineHeight: '1.5', textAlign: 'center', color: '#555' }}>
              Thank you for registering with us. To complete your registration, please use the one-time
              password (OTP) below to verify your email address:
            </Text>
          </Row>
          <Row>
            <Section style={{ marginTop: '20px', textAlign: 'center' }}>
              <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#0073e6' }}>{otp}</Text>
            </Section>
          </Row>
          <Row>
            <Text style={{ fontSize: '16px', lineHeight: '1.5', textAlign: 'center', color: '#555' }}>
              If you didn't request this, please ignore this email. If you have any questions, feel free to
              contact our support team.
            </Text>
          </Row>
          <Row>
            <Section style={{ textAlign: 'center', marginTop: '30px' }}>
              <Button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0073e6',
                  color: '#ffffff',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Verify Your Email
              </Button>
            </Section>
          </Row>
          <Row>
            <Text style={{ fontSize: '14px', textAlign: 'center', color: '#777', marginTop: '20px' }}>
              Thank you for choosing us. We’re excited to have you on board!
            </Text>
          </Row>
        </Section>
      </body>
    </Html>
  );
}
