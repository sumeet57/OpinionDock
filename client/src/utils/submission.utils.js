const apiUrl = import.meta.env.VITE_SERVER_URL;
export const getFormSubmissions = async (formId) => {
  try {
    const response = await fetch(`${apiUrl}/api/submissions/${formId}/views`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};
