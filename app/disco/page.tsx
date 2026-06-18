import DiscoScene from "../components/DiscoScene";
import DiscoPreLoader from "../components/DiscoPreLoader";
import Link from "next/link";

export default function DiscoPage() {
  return (
    <>
      <DiscoPreLoader />
      <DiscoScene />
      <Link
        href="/"
        className="fixed top-6 left-6 z-[100] flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-all group border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/30 rounded-full px-4 py-1.5 shadow-sm"
      >
        <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span>
        Back
      </Link>
    </>
  );
}
