"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="text-2xl md:text-4xl font-medium underline underline-offset-8 hover:text-third transition-colors"
    >
      {copied ? "Copied!" : email}
    </button>
  );
}
