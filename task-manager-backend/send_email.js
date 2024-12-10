require('dotenv').config({ path: '../.env' });

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// Create SES client using credentials from .env
const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const params = {
  Source: process.env.SES_SOURCE_EMAIL, // Get source email from .env
  Destination: {
    ToAddresses: ['sohaibshehabsnouber@gmail.com'], // destination email
  },
  Message: {
    Subject: { Data: "Test Email from Amazon SES" },
    Body: { Text: { Data: "Hello! This is a test email." } },
  },
};

const command = new SendEmailCommand(params);

client.send(command)
  .then((data) => console.log("Email sent successfully:", data))
  .catch((error) => console.error("Error sending email:", error));
