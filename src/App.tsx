import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./services/auth.service";
import { setCredentials, setLoading } from "./store/slices/authSlice";
import { Login } from "./pages/Login";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data?.user) {
          dispatch(setCredentials(data.user));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Login />
    </div>
  );
};

export default App;
