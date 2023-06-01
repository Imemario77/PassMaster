import nodemailer from 'nodemailer';

// Create a transporter with your email service provider's SMTP settings
const transportConfig= nodemailer.createTransport({
  service: 'gmail',
    auth: {
    user: 'imemario77@gmail.com',
    pass: 'bdmgvpuyymaoujsi',
  },
});

export const transporter = async  (recipient,recipientName,otpCode) => {
	try {
    const info = await transportConfig.sendMail({
      from: 'PassMaster',
      to: recipient,
      subject: 'PassMaster Otp Verification',
      text: `
Dear ${recipientName}


Your Verification code is ${otpCode}.


For further enquiries, please contact our customer support through the following channels:
Email：imemario77@gmail.com
Phone：08148672106
 
Thank you for choosing PassMaster.
`,
    });

    console.log('Email sent:', info.messageId);
    return true
  } catch (error) {
    console.error('Error sending email:', error);
    return false
  }
}
