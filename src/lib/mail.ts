import * as React from "react";

import { Contact } from "@/components/email/contact";
import { resend } from "@/lib/resend";

export const sendEmail = async (email: string, message: string) => {
  await resend.emails.send({
    from: "Enquiry <noreply@cxassets.co.uk>",
    to: "support@cxassets.co.uk",
    subject: "Message from enquiry form",
    replyTo: email,
    react: React.createElement(Contact, { message: message, email: email }),
  });
};
