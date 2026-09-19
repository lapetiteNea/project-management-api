import { appClient } from "./app.client";

export const projectService = {
  getProjects: async () => {
    return await appClient("/projects", {
      method: "GET",
    });
  },

  createProject: async (data: any) => {
    return await appClient("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  editProject: async (id: string, data: any) => {
    return await appClient(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteProject: async (id: string) => {
    return await appClient(`/projects/${id}`, {
      method: "DELETE",
    });
  },
};
