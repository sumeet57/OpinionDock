const apiUrl = import.meta.env.VITE_SERVER_URL;

export const fetchUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/users/get-user`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      return data.user;
    } else {
      throw new Error(data.message || "Failed to fetch user data");
    }
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
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
      throw new Error(" ");
    }
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const res = await fetch(`${apiUrl}/api/users/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(data.message || "Failed to update user data");
    }
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(data.message || "Failed to logout");
    }
  } catch (error) {
    throw new Error("Error logging out: " + error.message);
  }
};
