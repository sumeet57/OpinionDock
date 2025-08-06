const apiUrl = import.meta.env.VITE_SERVER_URL;

export const submitForm = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/api/forms/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    } else {
      const data = await response.json();
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
      credentials: "include", // Include cookies for authentication
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
