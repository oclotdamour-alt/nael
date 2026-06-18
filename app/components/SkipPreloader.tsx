"use client";

import { useEffect } from "react";
import { skipPreloader } from "./PreLoader";

export default function SkipPreloader() {
  useEffect(() => {
    skipPreloader();
  }, []);
  return null;
}
