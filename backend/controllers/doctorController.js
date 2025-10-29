import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctor });
  } catch (err) {
    res.status(404).json({ success: false, message: "Doctor not found" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Doctors found", data: doctors });
  } catch (err) {
    res.status(404).json({ success: false, message: "No doctor found" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor profile not found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Doctor profile found",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

export const getAllDoctorsUsingAI = async (req, res) => {
  try {
    const { query } = req.query;

    const availableSpecializations = await Doctor.distinct("specialization");

    const prompt = `
You are a medical assistant. Given a patient's query and a list of available doctor specializations, return the most appropriate specializations that the patient should consult.

Rules:
1. Consider specializations from the provided list "Available specializations".
2. If no specialization from the list is appropriate, return an empty array.
3. Also suggest any other specializations (not in the list) that could be relevant, in a separate field called "other_recommendations".
4. Provide reasons for each suggestion.

Available specializations:
${JSON.stringify(availableSpecializations)}

Patient's query:
"${query}"

Return the result in the following format only (no extra text):
{
  "specializations": [ ... ],
  "reasons": [
    {
      "SpecializationName": "...",
      "Why it's appropriate": "..."
    },
  ],
  "other_recommendations": [
    {
      "SpecializationName": "...",
      "Why it's relevant but not in the available list": "..."
    },
  ]
}
`;

    const { text: spls } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: prompt,
    });

    const cleanedSpls = spls.replace(/^```json\s*|\s*```$/g, "");

    const result = await JSON.parse(cleanedSpls);
    const specializations = result.specializations;

    if (specializations.length == 0) {
      return res
        .status(200)
        .json({ success: true, message: "No doctor found", data: result });
    }

    const doctors = await Doctor.find({
      isApproved: "approved",
      $or: specializations.map((s) => ({
        specialization: { $regex: s, $options: "i" },
      })),
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: { doctors: doctors, ...result },
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No doctor found" });
  }
};
