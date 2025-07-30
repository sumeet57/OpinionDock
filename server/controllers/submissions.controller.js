import { Submission } from "../models/submission.model.js";
import {
  isValidForm,
  isValidAnswers,
  isValidUserInfo,
} from "../utils/submissions.util.js";
export const createSubmission = async (req, res) => {
  const { userInfo, answers } = req.body;
  const { formId } = req.params;

  // Validate input
  if (!formId || !userInfo || !answers) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const form = await isValidForm(formId);
  if (!form) {
    return res.status(404).json({ error: "Form not found" });
  }
  if (!isValidAnswers(answers, form.fields)) {
    return res.status(400).json({ error: "Invalid answers format" });
  }
  if (!isValidUserInfo(userInfo)) {
    return res.status(400).json({ error: "Invalid user information" });
  }

  // Check if multiple submissions are allowed
  if (!form.multipleSubmissions) {
    const existingSubmission = await Submission.findOne({
      form: formId,
      "userInfo.email": userInfo.email,
    });
    if (existingSubmission) {
      return res.status(400).json({
        error: "Multiple submissions are not allowed for this form",
      });
    }
  }

  if (form.multipleSubmissions) {
    // Check if the user has already submitted this form
    let currentEmail = userInfo.email;

    const existingSubmission = await Submission.findOne({
      form: formId,
      "userInfo.email": currentEmail,
    });
    if (existingSubmission) {
      // update the existing submission
      existingSubmission.answers = answers;
      existingSubmission.submitedAt = new Date();
      await existingSubmission.save();
      return res.status(200).json({
        message: "Form is updated successfully",
        submission: existingSubmission,
      });
    }
  }
  // Create new submission
  try {
    const submission = new Submission({
      form: formId,
      userInfo,
      answers,
    });
    await submission.save();
    res.status(200).json({ message: "Form is submitted", submission });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create submission", details: error.message });
  }
};

export const getAllSubmissions = async (req, res) => {
  const { formId } = req.params;

  // Validate formId
  if (!formId) {
    return res.status(400).json({ error: "Form ID is required" });
  }
  const form = await isValidForm(formId);
  if (!form) {
    return res.status(404).json({ error: "Form not found" });
  }

  try {
    const submissions = await Submission.find({ form: formId }).populate(
      "userInfo"
    );
    res.status(200).json(submissions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch submissions", details: error.message });
  }
};
