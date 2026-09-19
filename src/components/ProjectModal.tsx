import React from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { projectValidationSchema } from "../utils/validations";
import { projectService } from "../services/project.service";
import { Project } from "../models/ProjectProps";
import { Input } from "../shared/ui/Input";
import { Button } from "../shared/ui/Button";

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
    enableReinitialize: true,
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
    validationSchema: toFormikValidationSchema(projectValidationSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditing && initialData?.id) {
          await projectService.editProject(initialData.id, values);
        } else {
          await projectService.createProject(values);
        }
        onSuccess();
        resetForm();
        onClose();
      } catch (error) {
        console.error("Failed to save project:", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Project" : "Add Project"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.title}
            touched={formik.touched.title as boolean}
          />
          <Input
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.description}
            touched={formik.touched.description as boolean}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
