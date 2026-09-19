export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  // დროებითი იმიტაცია ან რეალური API მოთხოვნა
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
