const EmailQueue = require("../services/Email");

const updateSubscription = async (subscribed, user) => {
  if (subscribed) {
    EmailQueue.add(user, { repeat: { every: 100000, jobId: user._id } }); //for test purposes every 36second
    return "subscribed for weekly email";
  } else {
    EmailQueue.getRepeatableJobs().then((jobs) => {
      for (let job of jobs) {
        if (job.id == user._id) {
          EmailQueue.removeRepeatableByKey(job.key);
        }
      }
    });
    return "unsubscribed for weekly email";
  }
};

module.exports = updateSubscription;
