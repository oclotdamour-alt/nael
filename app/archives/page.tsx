import PageShell from "../components/PageShell";
import { archives } from "../data/projects";

export const metadata = { title: "Archives — Nael Lamaison" };

export default function ArchivesPage() {
  return (
    <PageShell>
      <h1 className="mb-16 text-sm uppercase tracking-widest text-fourth">
        Archives
      </h1>
      <p className="mb-12 max-w-xl text-lg text-foreground/80">
        A growing collection of earlier explorations and experiments.
      </p>
      <ul className="divide-y divide-border/20 border-y border-border/20">
        {archives.map((item) => (
          <li
            key={item.slug}
            className="flex items-center justify-between py-6 text-foreground"
          >
            <span className="text-xl font-medium">{item.name}</span>
            <span className="text-sm text-fourth">{item.year}</span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
