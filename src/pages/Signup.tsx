import React from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signupValidationSchema } from "../utils/validations";
import { register } from "../services/auth.service";
import { Input } from "../components/Input";

export const Signup: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(signupValidationSchema),
    onSubmit: async (values) => {
      const { confirmPassword, ...registerData } = values;
      await register(registerData);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input
          label="First Name"
          type="text"
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
          {...formik.getFieldProps("firstName")}
        />

        <Input
          label="Last Name"
          type="text"
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
          {...formik.getFieldProps("lastName")}
        />

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

        <Input
          label="Confirm Password"
          type="password"
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
          {...formik.getFieldProps("confirmPassword")}
        />

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
