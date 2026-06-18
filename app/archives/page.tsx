import PageShell from "../components/PageShell";
import ArchiveAccordion from "../components/ArchiveAccordion";
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
      <ArchiveAccordion items={archives} />
    </PageShell>
  );
}
