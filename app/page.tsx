import Link from "next/link";
import Image from "next/image";
import Logo from "./components/Logo";
import SideNav from "./components/SideNav";
import CopyEmail from "./components/CopyEmail";
import ThemeToggle from "./components/ThemeToggle";
import Marquee from "./components/Marquee";
import BouncingSkills from "./components/BouncingSkills";
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
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 rounded-2xl px-4 py-4 md:px-6 md:py-5 backdrop-blur-md bg-black/20 border border-white/10">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mb-1">
              Motion Designer & Visual Artist
            </p>
            <h1 className="text-4xl md:text-7xl font-medium text-white leading-none">
              Nael<br />Lamaison
            </h1>
          </div>

          {/* Scroll hint */}
          <a
            href="#about"
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-2 text-xs md:text-sm font-medium text-white/90 tracking-widest uppercase drop-shadow-lg hover:text-white transition-colors"
          >
            <span>Scroll</span>
            <span className="inline-block animate-bounce">↓</span>
          </a>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          className="snap-section flex flex-col items-center justify-center px-6 py-24 md:px-24 md:py-0"
        >
          <div className="w-full max-w-3xl text-center">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-medium leading-[1.15] sm:leading-tight text-balance">
              Motion designer & visual artist crafting work that moves —
              not just decorates.
            </h2>
            <p className="mt-5 md:mt-6 text-sm sm:text-base md:text-xl text-fourth text-balance">
              Specialized in 3D animation and branding. Based in Spain,
              available for projects worldwide.
            </p>
            <div className="mt-10 md:mt-12 w-full">
              <Marquee items={tools} direction="right" variant="outline" />
            </div>
            <div className="mt-3 md:mt-4 w-full">
              <Marquee items={services} direction="left" variant="filled" />
            </div>
            <p className="mt-8 md:mt-10 text-xs sm:text-sm text-fourth">
              Open to freelance, collaborations, and full-time opportunities.
            </p>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section
          id="projects"
          className="snap-section flex flex-col items-center justify-center px-6 py-24 md:px-24 md:py-0"
        >
          <div className="mb-8 md:mb-12 flex w-full max-w-4xl items-center justify-between">
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
          <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
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
          className="snap-section flex flex-col items-center justify-center px-6 py-24 md:px-24 md:py-0"
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
          className="snap-section flex flex-col items-center justify-center px-6 py-24 md:px-24 md:py-0"
        >
          <h2 className="mb-6 text-sm uppercase tracking-widest text-fourth">
            Contact
          </h2>
          <CopyEmail email="nael.lamaison@ik.me" />
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-fourth">
            {[
              { label: "Instagram", href: "https://www.instagram.com/naelamaison/" },
              { label: "YouTube",   href: "https://www.youtube.com/@naelamaison" },
              { label: "TikTok",    href: "https://www.tiktok.com/@naelamaison" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/nael-lamaison-1bb6531b7/" },
              { label: "X",         href: "https://x.com/naelamaison" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="hover:text-foreground transition-colors">
                {label}
              </a>
            ))}
          </div>
        </section>
      </SnapContainer>
    </>
  );
}
