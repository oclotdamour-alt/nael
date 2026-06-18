"use client";

import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function HomeLink() {
  const router = useRouter();

  const handleClick = () => {
    sessionStorage.removeItem("snap-scroll");
    // Si déjà sur la homepage, scroll vers le haut manuellement
    const snapContainer = document.querySelector(".snap-container");
    if (snapContainer) {
      snapContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Sur mobile, c'est la fenêtre qui scrolle
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push("/");
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-3">
      <Logo size={24} />
      <span className="text-sm font-medium tracking-wide">Nael Lamaison</span>
    </button>
  );
}
