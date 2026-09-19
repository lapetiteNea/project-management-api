export interface Project {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
}
