import mongoose from "mongoose";

const { Schema, model } = mongoose;

const workExperienceSchema = new Schema({
  jobTitle: { type: String, trim: true },
  company: { type: String, trim: true },
  duration: { type: String, trim: true },
  responsibilities: { type: String, trim: true },
});

const jobApplicationSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    professionalSummary: { type: String, trim: true },
    education: { type: String, trim: true },
    workExperience: { type: [workExperienceSchema], default: [] },
    skills: { type: [String], default: [] },
    preferredJobFunctions: { type: [String], default: [] },
    interview: { type: String, trim: true },
    employmentPreferences: { type: String, trim: true },
    availability: { type: String, trim: true },
    consent: { type: Boolean, default: false },
    udid: { type: String, trim: true },
  },
  { timestamps: true }
);

export default model("JobApplication", jobApplicationSchema);
