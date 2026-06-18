import PageShell from "../components/PageShell";
import ArchiveAccordion from "../components/ArchiveAccordion";
import BackButton from "../components/BackButton";
import { archives } from "../data/projects";

export const metadata = { title: "Archives — Nael Lamaison" };

export default function ArchivesPage() {
  return (
    <PageShell>
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-sm uppercase tracking-widest text-fourth">
          Archives
        </h1>
        <BackButton />
      </div>
      <p className="mb-12 max-w-xl text-base md:text-lg text-foreground/80">
        A growing collection of earlier explorations and experiments.
      </p>
      <ArchiveAccordion items={archives} />
    </PageShell>
  );
}
