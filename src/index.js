require("dotenv").config();
const AWS = require("aws-sdk");

const SES = new AWS.SES({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "us-east-1",
});

async function sendTestEmail(to) {
  const from = "Name <from@example.com>";

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<p>Node.js and <strong>Amazon SES</strong> test e-mail</p>",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "This is a test!",
      },
    },
    Source: from,
  };

  try {
    await SES.sendEmail(params).promise();
    console.log("E-mail sent successfully!");
  } catch (error) {
    console.log(error);
  }
}

console.log("Starting...");
sendTestEmail("recipient@example.com");
