import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../store/slices/authSlice";
import { projectService } from "../services/project.service";
import { Project } from "../models/ProjectProps";

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <h1 className="text-xl font-bold">Project Feedback</h1>
        <div className="flex items-center gap-4">
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={() => dispatch(logoutUser())}
            className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <h3 className="text-xl font-medium text-gray-600">
              პროექტი ჯერ არ არის
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-5 rounded-lg shadow border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
