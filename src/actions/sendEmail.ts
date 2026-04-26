"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    const { name, email, subject, message } = formData;

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "syedmohiuddinmeshal24@gmail.com",
            subject: `${subject} - ${name}`,
            replyTo: email,
            html: `
			<div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:40px 20px;">
				<table align="center" width="100%" style="max-width:600px; background:white; border-radius:12px; padding:32px; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
				<tr>
					<td style="text-align:center; padding-bottom:20px;">
					<h2 style="margin:0; color:#111;">📨 New Portfolio Message</h2>
					<p style="margin:6px 0 0; color:#666; font-size:14px;">
						${name} just contacted you from your website
					</p>
					</td>
				</tr>
				<tr>
					<td>
					<hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
					</td>
				</tr>
				<tr>
					<td style="padding-top:10px;">
					<div style="background:#f1f5f9; padding:20px; border-radius:10px;">
						<p style="margin:0; font-size:15px; line-height:1.6; color:#111;">
						${message.replace(/\n/g, "<br/>")}
						</p>
					</div>
					</td>
				</tr>
				<tr>
					<td style="text-align:center; padding-top:28px;">
					<p style="font-size:12px; color:#999; margin:0;">
						Sent from your portfolio contact form
					</p>
					</td>
				</tr>

				</table>
			</div>`,
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}
