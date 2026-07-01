// app/projects/[id]/page.tsx

import { projects } from "@/lib/data";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}