import { redirect } from "react-router-dom";
import { store } from "../store/store";
import { getMe } from "../services/auth.service";
import { logoutUser, setCredentials } from "../store/slices/authSlice";

export const authLoader = async () => {
  const state = store.getState();

  if (state.auth.isAuthenticated) {
    return null;
  }

  try {
    const user = await getMe();
    if (user) {
      store.dispatch(setCredentials(user));
      return null;
    }
  } catch (error) {
    console.error("Auth loader error:", error);
  }

  store.dispatch(logoutUser());
  return redirect("/login");
};
