import sendEmail from '../../utils/emailUtils';

export default async function handler(req, res) {
  // Get data from your database
  const { method, body } = req;
  const data = JSON.parse(body);
  switch (method) {
    case 'POST': {
      // create new profile
      try {
        const emailBody = `<!DOCTYPE html>
        <html>
        <body>
        <h3>Hello ${data.recepientName},</h3>
        <p>${data.message}</p>
        <p>Regards,<br/>${data.senderName}</p>
        </body>
        </html>
        `;

        const ackEmailBody = `<!DOCTYPE html>
        <html>
        <body>
        <h3>Hello ${data.senderName},</h3>
        <p>you have contacted ${data.recepientName} with below message. <br/><span style="color:blue">${data.message}<span></p>
        <p>Regards,<br/>Mailing Team</p>
        </body>
        </html>
        `;
        await sendEmail(data.senderEmail, data.recepientEmail, `${data.senderName} wants to connect with you`, emailBody);
        await sendEmail('node.emailer.6688@gmail.com', data.senderEmail, `You have contacted ${data.recepientName}`, ackEmailBody);
        res.status(200).json({ message: 'Email Sent Successfully' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error sending email!!' });
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
