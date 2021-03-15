const sgMail = require("@sendgrid/mail");
const Queue = require("bull");
const Mention = require("../models/mention/mention.schema");
const getWeeklyEmailHtml = require("./getWeeklyEmail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const EmailQueue = new Queue("weeklyReport", "redis://127.0.0.1:6379");

EmailQueue.process(async (job, done) => {
  const { companies: userCompanies, email } = job.data;
  const companies = userCompanies.map((company) => company.company);
  //returns 4 mentions which today - 1 week and most popular and related to user companies
  let mentions = await Mention.find({
    company: { $in: companies },
    created: { $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
  })
    .sort({ popularity: -1 })
    .limit(4);


  try {
    const msg = {
      to: email, // Change to your recipient
      from: "mentionsmention@gmail.com", // Change to your verified sender
      subject: "Weekly Report",
      text: "and easy to do anywhere, even with Node.js",
      html: await getWeeklyEmailHtml(mentions),
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          // Extract error msg
          const { response } = error;
          // Extract response msg
          const {  body } = response;

          console.error(body);
        }
      }); 
    done();
  } catch (err) {
    console.log(err.message);
  }
});

EmailQueue.on("completed", async (job, result) => {
  console.log(`Email was sent to ${job.data.email} `);
});

module.exports = EmailQueue;
