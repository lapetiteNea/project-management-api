import React from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginValidationSchema } from "../utils/validations";
import { login } from "../services/auth.service";
import { setCredentials } from "../store/slices/authSlice";
import { Input } from "../shared/ui/Input";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginValidationSchema),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await login(values);
        if (response?.user) {
          dispatch(setCredentials(response.user));
          navigate("/dashboard");
        }
      } catch (err: any) {
        setFieldError("email", err?.message || "Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          {...formik.getFieldProps("email")}
        />

        <Input
          label="Password"
          type="password"
          error={formik.errors.password}
          touched={formik.touched.password}
          {...formik.getFieldProps("password")}
        />

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
