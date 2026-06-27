import { projects } from "@/lib/data";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import { LankaMeshDetail } from "@/components/LankaMeshDetail";

// add this alongside the Elevision one:
{project.id === 1 && <ElevisionDetail />}
{project.id === 2 && <LankaMeshDetail />}

// Required for output: 'export' — tells Next.js every [id] value to pre-render
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}