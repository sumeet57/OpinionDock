const apiUrl = import.meta.env.VITE_SERVER_URL;

export const fetchUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/users/get-user`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 200) {
      const data = await res.json();
      return data.user;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/users/get-access-token`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Failed to get access token");
    }
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};
