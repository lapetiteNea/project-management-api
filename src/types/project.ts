export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "pending";
}
