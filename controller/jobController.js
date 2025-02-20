import Job from "../model/jobProviderModel.js";

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete job by ID
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new job
export const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      department,
      positions,
      location,
      employmentType,
      experienceMin,
      experienceMax,
      salaryMin,
      salaryMax,
      qualifications,
      skills,
      responsibilities,
      benefits,
      deadline,
      accommodations,
    } = req.body;

    const userID = req.user._id;


    const job = new Job({
      jobTitle,
      department,
      positions,
      location,
      employmentType,
      experienceMin,
      experienceMax,
      salaryMin,
      salaryMax,
      qualifications,
      skills,
      responsibilities,
      benefits,
      deadline,
      accommodations,
      userID, 
    });

    // Save the job instance to the database
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
