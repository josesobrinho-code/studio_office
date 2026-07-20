"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const ProductsMediaClient = lazy(() => import("./ProductsMediaClient"));

function ProductsFallback() {
  return <div className="h-[400svh] md:h-[400vh]" aria-hidden />;
}

export function ProductsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <ProductsFallback />;
  }

  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsMediaClient />
    </Suspense>
  );
}
