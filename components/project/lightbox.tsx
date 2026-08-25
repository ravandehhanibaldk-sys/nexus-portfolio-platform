"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { imagePath } from "@/lib/utils";
import { t, type ProjectAsset } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Sitewide image lightbox. `LightboxProvider` wraps a project page once;
 * any `Frame` inside it can open the lightbox scoped to its own gallery
 * (the sibling images in its section) via `useLightbox().open(...)`, so
 * left/right navigation moves through the same visually grouped sequence
 * the reader was already looking at, not the whole page's images jumbled
 * together.
 */

type LightboxState = {
  projectId: string;
  images: ProjectAsset[];
  index: number;
  locale: Locale;
} | null;

type LightboxContextValue = {
  open: (projectId: string, images: ProjectAsset[], index: number, locale?: Locale) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}

export function LightboxProvider({ children, dict }: { children: React.ReactNode; dict?: Dictionary }) {
  const [state, setState] = useState<LightboxState>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((projectId: string, images: ProjectAsset[], index: number, locale: Locale = "en") => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setState({ projectId, images, index, locale });
  }, []);

  const close = useCallback(() => {
    setState(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setState((prev) => {
      if (!prev) return prev;
      const total = prev.images.length;
      const index = (prev.index + delta + total) % total;
      return { ...prev, index };
    });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {state ? (
        <LightboxModal
          projectId={state.projectId}
          images={state.images}
          index={state.index}
          locale={state.locale}
          dict={dict}
          onClose={close}
          onStep={step}
        />
      ) : null}
    </LightboxContext.Provider>
  );
}

function LightboxModal({
  projectId,
  images,
  index,
  locale,
  dict,
  onClose,
  onStep,
}: {
  projectId: string;
  images: ProjectAsset[];
  index: number;
  locale: Locale;
  dict?: Dictionary;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const asset = images[index];
  const hasMultiple = images.length > 1;
  const closeLabel = dict?.common.close ?? "Close";
  const previousLabel = dict?.common.previousImage ?? "Previous image";
  const nextLabel = dict?.common.nextImage ?? "Next image";

  useEffect(() => {
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMultiple) onStep(-1);
      else if (e.key === "ArrowRight" && hasMultiple) onStep(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onStep, hasMultiple]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const endX = e.changedTouches[0]?.clientX;
    if (touchStartX.current === null || endX === undefined || !hasMultiple) return;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 48) onStep(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  }

  if (!asset) return null;

  const alt = t(asset.alt, locale);
  const caption = asset.caption ? t(asset.caption, locale) : null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={caption ?? alt}
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 outline-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors duration-[var(--duration-base)] p-2"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label={previousLabel}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-[var(--duration-base)] p-2"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label={nextLabel}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-[var(--duration-base)] p-2"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </>
      ) : null}

      <div className="relative w-full max-w-6xl h-[75vh]">
        <Image
          key={asset.src}
          src={imagePath(projectId, asset.src)}
          alt={alt}
          fill
          sizes="100vw"
          quality={95}
          className="object-contain"
          priority
        />
      </div>

      {caption ? (
        <p className="mt-4 text-caption font-body text-white/80 text-center max-w-2xl px-4">
          {caption}
        </p>
      ) : null}

      {hasMultiple ? (
        <p className="mt-2 text-meta font-body text-white/50">
          {index + 1} / {images.length}
        </p>
      ) : null}
    </div>
  );
}
