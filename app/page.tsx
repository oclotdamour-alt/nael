import Link from "next/link";
import Image from "next/image";
import Logo from "./components/Logo";
import SideNav from "./components/SideNav";
import CopyEmail from "./components/CopyEmail";
import ThemeToggle from "./components/ThemeToggle";
import Marquee from "./components/Marquee";
import HomeLink from "./components/HomeLink";
import SnapContainer from "./components/SnapContainer";
import HeroCharacter from "./components/HeroCharacter";
import HeroBg from "./components/HeroBg";
import { projects } from "./data/projects";

const tools = ["Blender", "Adobe Suite", "Unreal Engine 5", "DaVinci Resolve", "Rive"];

const services = ["3D Animation", "Motion Design", "Branding", "Art Direction", "Content"];

export default function Home() {
  return (
    <>
      <header className="fixed top-6 left-6 z-50 z-50 text-foreground">
        <HomeLink />
      </header>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <SideNav />

      <SnapContainer>
        {/* ── HERO ── */}
        <section
          id="hero"
          className="snap-section relative overflow-hidden"
        >
          {/* Background images — light / dark */}
          <HeroBg />

          {/* 3D character */}
          <HeroCharacter />

          {/* Name overlay — bottom left */}
          <div className="absolute bottom-10 left-10 z-10 rounded-2xl px-6 py-5 backdrop-blur-md bg-black/20 border border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
              Motion Designer & Visual Artist
            </p>
            <h1 className="text-5xl md:text-7xl font-medium text-white leading-none">
              Nael<br />Lamaison
            </h1>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 right-10 z-10 flex items-center gap-2 text-sm font-medium text-white/90 tracking-widest uppercase drop-shadow-lg">
            <span>Scroll</span>
            <span className="inline-block animate-bounce">↓</span>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          className="snap-section flex flex-col justify-center px-8 md:px-24"
        >
          {/* Top label */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs uppercase tracking-widest text-fourth">About</span>
            <div className="flex-1 h-px bg-border/30" />
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — statement */}
            <div>
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                Crafting work<br />
                <em className="not-italic text-fourth">that moves</em> —<br />
                not just decorates.
              </h2>
              <p className="mt-8 text-sm text-fourth leading-relaxed max-w-sm">
                Specialized in 3D animation and branding.<br />
                Based in Spain, available worldwide.
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-third">
                Open to freelance & full-time
              </p>
            </div>

            {/* Right — details */}
            <div className="flex flex-col gap-8">

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { n: "4+", label: "Years" },
                  { n: "20+", label: "Projects" },
                  { n: "3", label: "Countries" },
                ].map(({ n, label }) => (
                  <div key={label} className="border-t border-border/30 pt-4">
                    <p className="text-3xl font-medium">{n}</p>
                    <p className="text-xs uppercase tracking-widest text-fourth mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div className="border-t border-border/30 pt-6">
                <p className="text-xs uppercase tracking-widest text-fourth mb-4">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span key={t} className="text-xs border border-border/30 rounded-full px-3 py-1 text-foreground/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="border-t border-border/30 pt-6">
                <p className="text-xs uppercase tracking-widest text-fourth mb-4">Services</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <span key={s} className="text-xs bg-foreground/8 rounded-full px-3 py-1 text-foreground/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section
          id="projects"
          className="snap-section flex flex-col items-center justify-center px-8 md:px-24"
        >
          <div className="mb-12 flex w-full max-w-4xl items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-fourth">
              Selected Works
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-third hover:underline"
            >
              See all projects →
            </Link>
          </div>
          <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border/20 transition-colors hover:border-third aspect-[4/3] flex flex-col justify-end"
              >
                {/* Thumbnail */}
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
                {/* Content */}
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-medium text-white">{project.name}</h3>
                  <p className="mt-0.5 text-xs text-white/50 uppercase tracking-widest">
                    {project.type} — {project.year}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    View project →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── ARCHIVES ── */}
        <section
          id="archives"
          className="snap-section flex flex-col items-center justify-center px-8 md:px-24"
        >
          <h2 className="mb-6 text-sm uppercase tracking-widest text-fourth">
            Archives
          </h2>
          <p className="max-w-xl text-center text-lg text-foreground">
            A growing collection of earlier explorations and experiments.
          </p>
          <Link
            href="/archives"
            className="mt-8 text-sm font-medium text-third hover:underline"
          >
            Browse the archives →
          </Link>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          className="snap-section flex flex-col items-center justify-center px-8 md:px-24"
        >
          <h2 className="mb-6 text-sm uppercase tracking-widest text-fourth">
            Contact
          </h2>
          <CopyEmail email="nael.lamaison@ik.me" />
          <div className="mt-10 flex gap-6 text-sm text-fourth">
            <span>Instagram</span>
            <span>YouTube</span>
            <span>TikTok</span>
            <span>LinkedIn</span>
            <span>X</span>
          </div>
        </section>
      </SnapContainer>
    </>
  );
}
