"use client";

import * as React from "react";
import { ShapeField } from "@/components/design/shape-field";

/**
 * Shapes ship in the SSR HTML so they paint with the first frame.
 * Parallax still attaches after hydration (client-only).
 */
export function ShapeFieldLazy() {
  return <ShapeField />;
}
