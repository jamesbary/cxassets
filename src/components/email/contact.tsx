import {
  Body,
  Container,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ContactProps = {
  email: string;
  message: string;
};

export function Contact({ email, message }: ContactProps) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-slate-50 text-slate-800 font-sans">
          <Container className="max-w-2xl mx-auto py-6 px-5">
            <Section className="m-6 p-6">
              <Text className="leading-normal text-base">{message}</Text>
              <Text className="mt-3 leading-normal text-sm text-muted-foreground">
                Message from: {email}
              </Text>
            </Section>
            <Text className="mt-7 leading-normal text-xs text-center text-muted-foreground">
              Rievolut Microfinance, Inc. ・7 Westferry Circus Canary Wharf,
              London, E14 4HD
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
