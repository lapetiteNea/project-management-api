import React from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { projectValidationSchema } from "../utils/validations";
import { projectService } from "../services/project.service";
import { Project } from "../types/project";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "active",
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(projectValidationSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditing && initialData) {
          await projectService.editProject(initialData.id, values);
        } else {
          await projectService.createProject(values);
        }
        resetForm();
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Failed to save project:", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-2"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {String(formik.errors.title)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-2"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {String(formik.errors.description)}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Update Project" : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
