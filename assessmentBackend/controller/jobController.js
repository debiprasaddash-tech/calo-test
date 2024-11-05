const jobService = require("../services/jobServices");

exports.createJob = async (req, res) => {
  try {
    const jobId = await jobService.addJob(req);
    res.json({ jobId });
  } catch (error) {
    res.status(500).json({ error: "Could not create job" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve jobs" });
  }
};

exports.getJobStatus = async (req, res) => {
  try {
    const job = await jobService.getJob(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(404).json({ error: "Job not found" });
  }
};
