import Link from "next/link";
import PageShell from "../components/PageShell";
import { projects } from "../data/projects";

export const metadata = { title: "Projects — Nael Lamaison" };

export default function ProjectsPage() {
  return (
    <PageShell>
      <h1 className="mb-16 text-sm uppercase tracking-widest text-fourth">
        Projects
      </h1>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/20 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col justify-between border-border/20 bg-transparent p-10 transition-colors hover:bg-foreground/[0.04]"
          >
            <div>
              <h2 className="text-3xl font-medium">{project.name}</h2>
              <p className="mt-2 text-sm text-fourth">
                {project.type} — {project.year}
              </p>
              <p className="mt-4 text-base text-foreground/80">
                {project.summary}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-third opacity-0 transition-opacity group-hover:opacity-100">
              View project →
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
