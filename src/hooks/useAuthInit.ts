import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../services/auth.service";
import { setCredentials, setLoading } from "../store/slices/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
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

    checkAuth();
  }, [dispatch]);
};
