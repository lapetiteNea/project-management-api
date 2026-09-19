export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  console.log("Registering user:", data);
  return data;
};

export const login = async (data: LoginData) => {
  console.log("Logging in user:", data);
  return {
    user: {
      id: "1",
      firstName: "Nini",
      lastName: "User",
      email: data.email,
    },
  };
};

export const getMe = async () => {
  try {
    const response = await fetch("/api/auth/me");
    if (!response.ok) {
      throw new Error("Not authenticated");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
