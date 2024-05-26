import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 } })

    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } })
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1a5374f12e5c8b", // ❎
        pass: "03a62e509faed3"  // ❎
      }
    });

    const mailOptions = {
      from: 'vermagaurav851@gamil.com',
      to: email,
      subject: emailType === 'verify' ? "Verify Your Email" : "Reset your password",
      text: "Hello world?",
      html: `<>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a to ${emailType === "VERIFY" ? "verify your email" : "reset your password"
        } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p> `,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw Error(error.message)
  }
}