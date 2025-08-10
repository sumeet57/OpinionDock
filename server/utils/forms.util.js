export const isValidFormTitle = (title) => {
  return (
    typeof title === "string" && title.trim().length > 0 && title.length <= 100
  );
};
export const isValidFormDescription = (description) => {
  return (
    typeof description === "string" &&
    description.trim().length > 0 &&
    description.length <= 500
  );
};
export const isValidFormFields = (fields) => {
  if (!Array.isArray(fields) || fields.length === 0) return false;
  let letEveryField = fields.every((f) => {
    return (
      typeof f === "object" &&
      f !== null &&
      typeof f.label === "string" &&
      f.label.trim().length > 0 &&
      f.type &&
      [
        "text",
        "number",
        "email",
        "date",
        "select",
        "radio",
        "checkbox",
      ].includes(f.type) &&
      (f.options ? Array.isArray(f.options) : true) &&
      (f.required ? typeof f.required === "boolean" : true)
    );
  });
  return letEveryField;
};
