import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'SendinBlue', // no need to set host or port etc.
  auth: {
    user: 'node.emailer.6688@gmail.com',
    pass: 'YXhJ7C3c1FPtNzgA',
  },
});

const sendEmail = async (senderEmail, recepientEmail, subject, content) => {
  await transporter.sendMail({
    from: senderEmail,
    to: recepientEmail,
    subject,
    html: content,
  });
};

export default sendEmail;
