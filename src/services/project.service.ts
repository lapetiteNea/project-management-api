import { appClient } from "./app.client";
import { Project, CreateProjectRequest } from "../models/ProjectProps";

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    return await appClient("/api/projects");
  },

  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    return await appClient("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
