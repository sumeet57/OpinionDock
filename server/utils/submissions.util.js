import { Form } from "../models/form.model.js";

export const isValidForm = async (formId) => {
  if (!formId) {
    return false;
  }
  formId = formId.trim();
  const form = await Form.findById(formId);
  return form;
};
export const isValidAnswers = (answers, fields) => {
  if (!Array.isArray(answers) || !Array.isArray(fields)) {
    return false;
  }

  for (let i = 0; i < answers.length; i++) {
    const field = fields.find((f) => f.id === answers[i].fieldId);
    const answer = answers[i].answer;
    if (!field || !answer) {
      return false;
    }
    if (field.type === "text" && typeof answer !== "string") {
      return false;
    } else if (field.type === "number" && typeof answer !== "number") {
      return false;
    } else if (field.type === "select" && !Array.isArray(answer)) {
      return false;
    }
  }

  return true;
};
export const isValidUserInfo = (userInfo) => {
  if (typeof userInfo !== "object" || userInfo === null) {
    return false;
  }
  const { name, email, phone } = userInfo;
  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    name.length > 50
  ) {
    return false;
  }
  if (
    email &&
    (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return false;
  }
  if (phone && (typeof phone !== "string" || !/^\d{10,15}$/.test(phone))) {
    return false;
  }
  return true;
};
