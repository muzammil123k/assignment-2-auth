import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Create the transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "muzammilidrees240@gmail.com", // Type your actual personal Gmail here
		pass: "akhjdhcubblttczr" // Paste your 16-character app password here (no spaces)
	}
});

export async function sendVerificationEmail(email: string, token: string) {
    // This is the link the user will click in their email
	const confirmLink = `http://localhost:5173/auth/verify?token=${token}`;

	const mailOptions = {
		from: `"Auth App Security" <${env.EMAIL_USER}>`,
		to: email,
		subject: 'Confirm your email address',
		html: `
			<div style="font-family: sans-serif; padding: 20px;">
				<h2>Welcome to our App!</h2>
				<p>Please confirm your email address by clicking the link below:</p>
				<a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
				<p style="margin-top: 20px; font-size: 12px; color: gray;">This link will expire in 1 hour.</p>
			</div>
		`
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Verification email successfully sent to ${email}`);
	} catch (error) {
		console.error("Failed to send verification email:", error);
	}
}

export async function sendPasswordResetEmail(email: string, token: string) {
	const resetLink = `http://localhost:5173/reset-password?token=${token}`;

	const mailOptions = {
		from: `"Auth App Security" <${env.EMAIL_USER}>`,
		to: email,
		subject: 'Reset your password',
		html: `
			<div style="font-family: sans-serif; padding: 20px;">
				<h2>Password Reset Request</h2>
				<p>You requested to reset your password. Click the link below to set a new password:</p>
				<a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
				<p style="margin-top: 20px; font-size: 12px; color: gray;">This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
			</div>
		`
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Password reset email successfully sent to ${email}`);
	} catch (error) {
		console.error("Failed to send password reset email:", error);
	}
}