import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { ApiError } from "../exception/baseError";

export interface Recipient<T = DetailsRecipient> {
  to: string;
  subject: string;
  details: DetailsRecipient;
}

export interface DetailsRecipient {
  name: string,
  identityNumber :string,
  start: string,
  return :string,
  price: number,
  status: string

}

export const sendEmail = async <T>(recipient: Recipient<T>) => {
  try {
    const Transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let templateEmail: SendMailOptions = {
      from: "no-reply@example.com",
      to: recipient.to,
      subject: recipient.subject,
      html: `
        <html>
          <body>
            <p>Dear ${recipient.details.name},</p>
            <p>Thank you for your payment for our vehicle rental service. Here are the details of the invoice that has been paid:</p>
            <ul>
              <li><strong>Buyer's Vehicle Number:</strong> ${
                recipient.details.identityNumber
              }</li>
              <li><strong>Rental Start Date:</strong> ${recipient.details.start.toLocaleString()}</li>
              <li><strong>Return Date:</strong> ${recipient.details.return.toLocaleString()}</li>
              <li><strong>Rental Price:</strong> ${recipient.details.price}</li>
              <li><strong>Payment Status:</strong> Paid in Full</li>
            </ul>
            <p>We appreciate your business and hope to serve you again in the future. If you have any further questions or need assistance, please feel free to contact us.</p>
            <p>Thank you and warm regards,<br>[Customer Service Team]</p>
          </body>
        </html>
      `,
    };

    return await Transporter.sendMail(templateEmail);
  } catch (error: any) {
    console.log(error);
    throw new ApiError(error.message, 400);
  }
};

