import { notFound } from "next/navigation";
import Image from "next/image";
import VideoPlayer from "../../components/VideoPlayer";
import PageShell from "../../components/PageShell";
import BackButton from "../../components/BackButton";
import { projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.name} — Nael Lamaison` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-fourth">
            {project.type} — {project.year}
          </p>
          <BackButton />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium leading-none mb-8">
          {project.name}
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-foreground/70 mb-12 md:mb-16">
          {project.description}
        </p>

        {/* Video */}
        <VideoPlayer src={project.video} />

        {/* Images grid */}
        {project.images.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {project.images.map((src, i) => (
              <div key={i} className="relative w-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${project.name} — ${i + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
