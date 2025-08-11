const apiUrl = import.meta.env.VITE_SERVER_URL;

export const submitForm = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/api/forms/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("Error submitting form:", data);
      throw new Error(data.error || "Failed to submit form");
    } else {
      // const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

export const fetchForms = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/forms/all`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch forms");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

export const fetchFormById = async (formId) => {
  try {
    const response = await fetch(`${apiUrl}/api/forms/${formId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch form by ID");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    throw error;
  }
};

export const deleteForm = async (formId) => {
  try {
    const response = await fetch(`${apiUrl}/api/forms/${formId}/delete`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete form");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error deleting form:", error);
    throw error;
  }
};
