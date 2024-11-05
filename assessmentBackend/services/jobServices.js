const fs = require("fs").promises;
const path = require("path");
// const fetch = require("node-fetch");

const JOBS_FILE = path.resolve(__dirname, "../jobs.json");

// Utility to read and write job data
async function readJobs() {
  try {
    const data = await fs.readFile(JOBS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function writeJobs(jobs) {
  await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

exports.addJob = async (req) => {
  const jobs = await readJobs();
  const jobId = Date.now().toString();
  jobs[jobId] = { status: "pending", title: req.body.title };
  await writeJobs(jobs);

  // Simulate a delayed job execution
  setTimeout(async () => {
    try {
      const response = await fetch("https://source.unsplash.com/random/food");
      jobs[jobId] = { status: "resolved", result: response.url };
      await writeJobs(jobs);
    } catch {
      jobs[jobId] = { status: "failed" };
      await writeJobs(jobs);
    }
  }, Math.floor(Math.random() * 12) * 5000 + 5000); // Random delay between 5 and 300 seconds

  return jobId;
};

exports.getAllJobs = async () => {
  return await readJobs();
};

exports.getJob = async (id) => {
  const jobs = await readJobs();
  return jobs[id] || { error: "Job not found" };
};
