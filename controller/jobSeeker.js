import JobApplication from "../model/jobSeeker.js";

// Get all job applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single job application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new job application
export const createApplication = async (req, res) => {
  try {
    const newApplication = new JobApplication(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Delete a job application by ID
export const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await JobApplication.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
