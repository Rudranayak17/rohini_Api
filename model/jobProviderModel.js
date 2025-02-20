import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    positions: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    experienceMin: { type: Number, required: true },
    experienceMax: { type: Number, required: true },
    salaryMin: { type: Number, required: true },
    salaryMax: { type: Number, required: true },
    qualifications: { type: String, required: true, trim: true },
    skills: { type: [String], required: true },
    responsibilities: { type: String, required: true, trim: true },
    benefits: { type: String, required: true, trim: true },
    deadline: { type: Date, required: true },
    accommodations: { type: String, trim: true },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
