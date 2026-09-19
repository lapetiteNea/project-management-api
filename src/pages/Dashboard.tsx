import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logoutUser } from "../store/slices/authSlice";
import { projectService } from "../services/project.service";
import { Project } from "../models/ProjectProps";
import { ProjectModal } from "../components/ProjectModal";

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleOpenAddModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("ნამდვილად გსურთ ამ პროექტის წაშლა?")) {
      try {
        await projectService.deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error("Failed to delete project:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <h1 className="text-xl font-bold">Project Feedback</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm transition font-medium"
          >
            + Add Project
          </button>
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
                className="bg-white p-5 rounded-lg shadow border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/dashboard/project/${project.id}`)}
                    className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(project)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchProjects}
          initialData={selectedProject}
        />
      )}
    </div>
  );
};

export default Dashboard;
