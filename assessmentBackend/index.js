const express = require("express");
// const jobController = require("./controllers/jobController");
const jobController=require("./controller/jobController")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.post("/jobs", jobController.createJob);
app.get("/jobs", jobController.getJobs);
app.get("/jobs/:id", jobController.getJobStatus);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
