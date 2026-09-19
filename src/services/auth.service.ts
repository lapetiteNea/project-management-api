export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  console.log("Registering user:", data);
  return data;
};
