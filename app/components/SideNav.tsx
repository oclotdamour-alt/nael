"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "archives", label: "Archives" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [active, setActive] = useState("about");
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    const hero = document.getElementById("hero");
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed right-6 top-1/2 z-50 -translate-y-1/2 transition-all duration-500 ${
        heroVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <ul className="flex flex-col items-end gap-4">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="group flex items-center gap-3"
              >
                <span
                  className={`text-sm uppercase tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-third opacity-100 translate-x-0"
                      : "text-foreground opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-third" : "bg-fourth"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
