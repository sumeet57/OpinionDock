import { Form } from "../models/form.model.js";
import {
  isValidFormTitle,
  isValidFormDescription,
  isValidFormFields,
} from "../utils/forms.util.js";

export const createForm = async (req, res) => {
  const { title, description, fields, multipleSubmissions } = req.body;
  const { id } = req.user;

  // Validate form data
  if (!isValidFormTitle(title)) {
    return res.status(400).json({ error: "Invalid form title" });
  }
  if (!isValidFormDescription(description)) {
    return res.status(400).json({ error: "Invalid form description" });
  }
  if (!isValidFormFields(fields)) {
    return res.status(400).json({ error: "Invalid form fields" });
  }
  if (typeof multipleSubmissions !== "boolean") {
    return res.status(400).json({ error: "Invalid multiple submissions flag" });
  }
  // Create new form
  try {
    const form = new Form({
      title,
      description,
      fields,
      multipleSubmissions,
      owner: id,
    });
    await form.save();
    res.status(200).json({ message: "Form created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create form", details: error.message });
  }
};

export const getForms = async (req, res) => {
  const { id } = req.user;
  try {
    const forms = await Form.find({ owner: id }).populate("owner");
    res.status(200).json(forms);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch forms", details: error.message });
  }
};

export const getFormById = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Form.findById(formId).select("-owner -createdAt");
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch form", details: error.message });
  }
};

export const deleteForm = async (req, res) => {
  const { formId } = req.params;
  const { id } = req.user;
  try {
    // Check if the form exists and belongs to the user
    const form = await Form.findByIdAndDelete(formId);

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    if (form.owner.toString() !== id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this form" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete form", details: error.message });
  }
};
