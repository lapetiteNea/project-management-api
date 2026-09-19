import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectService } from "../services/project.service";
import { Project } from "../models/ProjectProps";
import { Button } from "../shared/ui/Button";

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          // თუ სერვისში გაქვთ getProjectById ან მსგავსი, გამოიყენეთ ის.
          // ალტერნატივად, თუ სერვისი სხვანაირადაა, შეცვალეთ შესაბამის მეთოდზე:
          const data = await projectService.getProjects();
          const found = data.find((p: Project) => p.id === id) || null;
          setProject(found);
        }
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">იტვირთება...</div>;
  }

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 mb-4">პროექტი ვერ მოიძებნა</p>
        <Button onClick={() => navigate("/dashboard")}>
          უკან Dashboard-ში
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <Button
          variant="secondary"
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          ← უკან Dashboard-ში
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {project.title}
        </h1>
        <p className="text-gray-600 text-base mb-6">{project.description}</p>
        {}
      </div>
    </div>
  );
};

export default ProjectDetails;
