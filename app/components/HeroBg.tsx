"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroBg() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const update = () =>
      setDark(document.documentElement.classList.contains("dark"));

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Image
        src="/hero-light.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          opacity: dark ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />
      <Image
        src="/hero-dark.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          opacity: dark ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </>
  );
}
