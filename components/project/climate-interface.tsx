"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import type { ClimateInstrument } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";
import en from "@/dictionaries/en";
import { formatDict } from "@/lib/i18n-format";
import styles from "./climate-interface.module.css";

/**
 * Climate Interface — faithful port of an externally built, user-approved
 * standalone HTML/CSS/JS deliverable (see climate-interface.module.css for
 * the full provenance note). This file replicates app.js's state machine
 * (current month index, hero crossfade, sun-marker path position, play/pause
 * timeline) in React; climate-interface.module.css replicates styles.css
 * near-verbatim. Every displayed number comes directly from `data` — this
 * component computes no climate values of its own, only SVG point geometry
 * for the sun marker's on-screen position.
 *
 * The original's per-month solar altitude/time and wind-direction-label
 * values are pre-resolved once at content-authoring time (see
 * content/projects/*.ts) using the exact same formulas app.js used at
 * runtime — so this component only ever reads `month.solar.altitudeDeg` /
 * `.time` / `month.wind.directionLabel` directly, never re-derives them.
 */

const HERO_FADE_MS = 180;
const AUTOPLAY_MS = 2800;
const STREAM_KEYS = ["streamA", "streamB", "streamC", "streamD", "streamE"] as const;
const STREAM_PATHS = [
  "M8 24 H128 C151 24 151 4 136 4 C124 4 121 13 121 17",
  "M8 59 H177 C200 59 200 35 183 35 C170 35 167 45 167 49",
  "M42 94 H145 C168 94 168 116 152 116 C139 116 136 106 136 102",
  "M8 108 H82",
  "M8 42 H78",
];

export function ClimateInterface({
  data,
  projectId,
  locale = "en",
  dict = en,
}: {
  data: ClimateInstrument;
  projectId: string;
  locale?: Locale;
  dict?: Dictionary;
}) {
  void locale;
  const prefersReducedMotion = useReducedMotion() === true;
  const [current, setCurrent] = useState(0);
  const [displayedSeason, setDisplayedSeason] = useState(data.months[0]!.season);
  const [playing, setPlaying] = useState(false);
  const [sunPoint, setSunPoint] = useState<{ x: number; y: number } | null>(null);

  const solarPathRef = useRef<SVGPathElement>(null);
  const monthButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusPendingRef = useRef(false);

  const item = data.months[current]!;
  const altitudes = data.months.map((m) => m.solar.altitudeDeg);
  const minAltitude = Math.min(...altitudes);
  const maxAltitude = Math.max(...altitudes);

  const goTo = (index: number, focusMonth = false) => {
    const next = ((index % data.months.length) + data.months.length) % data.months.length;
    focusPendingRef.current = focusMonth;
    setCurrent(next);
  };

  // Hero crossfade — only when the season actually changes, matching the
  // original's `if (!hero.src.endsWith(nextSrc))` guard. `isFading` is
  // derived directly from the season mismatch (no separate state/render
  // needed for it); the effect only owns the delayed src swap itself.
  const isFading = item.season !== displayedSeason;
  useEffect(() => {
    if (item.season === displayedSeason) return;
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      setDisplayedSeason(item.season);
    }, HERO_FADE_MS);
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.season]);

  // Sun-marker position along the solar arc path.
  useEffect(() => {
    const path = solarPathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const progress = ((item.solar.altitudeDeg - minAltitude) / (maxAltitude - minAltitude)) * 0.62 + 0.04;
    const clamped = Math.min(1, Math.max(0, progress));
    const point = path.getPointAtLength(length * clamped);
    setSunPoint({ x: point.x, y: point.y });
  }, [item.solar.altitudeDeg, minAltitude, maxAltitude]);

  // Keyboard focus follow-through after Arrow/Home/End navigation.
  useEffect(() => {
    if (focusPendingRef.current) {
      monthButtonsRef.current[current]?.focus();
      focusPendingRef.current = false;
    }
  }, [current]);

  // Autoplay.
  useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    const id = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, prefersReducedMotion, current]);

  const heroSrc = `/images/${projectId}/climate/${data.images[displayedSeason]}`;
  const panelStyle = { "--sun": data.accentColor } as CSSProperties;

  const seasonLabel = (s: string) => dict.climate.seasons[s as keyof Dictionary["climate"]["seasons"]] ?? s.toUpperCase();
  const seasonLower = (s: string) => dict.seasonsLower[s as keyof Dictionary["seasonsLower"]] ?? s;

  return (
    <div className={styles.climatePanel} style={panelStyle} aria-label={formatDict(dict.climate.aria.interfaceLabel, { title: data.title })}>
      <figure className={styles.hero} aria-label={formatDict(dict.climate.aria.seasonalImage, { title: data.title })}>
        {/* eslint-disable-next-line @next/next/no-img-element -- faithful port: manual crossfade timing controls a plain <img>, matching the approved deliverable exactly. */}
        <img
          src={heroSrc}
          alt={formatDict(dict.climate.aria.imageInSeason, { title: data.title, season: seasonLower(displayedSeason) })}
          className={isFading ? styles.isFading : undefined}
          style={{ objectPosition: data.heroObjectPosition }}
        />
      </figure>

      <header className={styles.masthead}>
        <p className={styles.eyebrow}>{data.eyebrow} — {dict.climate.siteClimateInstrumentLabel}</p>
        <h1>
          {data.title}
          <span>—</span>
        </h1>
        <p className={styles.profile}>
          {data.locationLabel} · {seasonLabel(item.season)} {dict.climate.profileSuffix}
        </p>
      </header>

      <section className={styles.solar} aria-label={dict.climate.aria.solarPosition}>
        <svg viewBox="0 0 480 210" role="img" aria-label={dict.climate.aria.solarAltitudePath} className={styles.solarSvg}>
          <path ref={solarPathRef} className={styles.solarTrack} d="M 28 180 Q 225 10 454 48" pathLength={100} />
          <path className={styles.solarGuide} d="M 28 180 Q 225 10 454 48" pathLength={100} />
          <circle className={styles.sunHalo} r={34} cx={sunPoint?.x ?? 28} cy={sunPoint?.y ?? 180} />
          <circle className={styles.sunCore} r={15} cx={sunPoint?.x ?? 28} cy={sunPoint?.y ?? 180} />
          <circle className={styles.sunDot} r={7} cx={sunPoint?.x ?? 28} cy={sunPoint?.y ?? 180} />
        </svg>
        <div className={styles.solarReading}>
          <span className={styles.dataLabel}>{dict.climate.solarAltitude}</span>
          <strong>{item.solar.altitudeDeg.toFixed(1)}°</strong>
          <span>{dict.climate.at} {item.solar.time}</span>
        </div>
      </section>

      <section className={styles.wind} data-season={item.season} aria-label={dict.climate.aria.wind}>
        <span className={styles.dataLabel}>{dict.climate.prevailingWind}</span>
        <div className={styles.windReading}>
          <strong>{item.wind.directionLabel}</strong>
          <span>{item.wind.speedLabel}</span>
        </div>
        <svg className={styles.windLines} viewBox="0 0 240 124" aria-hidden="true">
          {STREAM_PATHS.map((d, i) => (
            <path key={STREAM_KEYS[i]} className={styles[STREAM_KEYS[i]!]} d={d} />
          ))}
        </svg>
      </section>

      <section className={`${styles.temperature} ${styles.metric}`} aria-label={dict.climate.aria.temperature}>
        <span className={`${styles.weatherIcon} ${styles.sunIcon}`} aria-hidden="true" />
        <div>
          <span className={styles.dataLabel}>{dict.climate.temperature}</span>
          <strong>
            {item.temperature.value.toFixed(1)} °{item.temperature.unit}
          </strong>
          <span>{dict.climate.monthlyMean}</span>
        </div>
      </section>

      {item.humidity ? (
        <section className={`${styles.humidity} ${styles.metric}`} aria-label={dict.climate.aria.relativeHumidity}>
          <span className={`${styles.weatherIcon} ${styles.humidityIcon}`} aria-hidden="true" />
          <div>
            <span className={styles.dataLabel}>{dict.climate.relativeHumidity}</span>
            <strong>{item.humidity.value}%</strong>
            <span>{dict.climate.regionalReference}</span>
          </div>
        </section>
      ) : null}

      <section className={`${styles.rainfall} ${styles.metric}`} aria-label={dict.climate.aria.rainfall}>
        <span className={`${styles.weatherIcon} ${styles.dropIcon}`} aria-hidden="true" />
        <div>
          <span className={styles.dataLabel}>{dict.climate.rainfall}</span>
          <strong>
            {item.rainfall.value} {item.rainfall.unit.toUpperCase()}
          </strong>
          <span>{dict.climate.monthTotal}</span>
        </div>
      </section>

      <nav className={styles.timeline} aria-label={dict.climate.aria.monthSelector}>
        <div className={styles.controls}>
          <button type="button" className={styles.control} aria-label={dict.climate.aria.previousMonth} onClick={() => goTo(current - 1)}>
            ←
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label={playing ? dict.climate.aria.pauseSequence : dict.climate.aria.playSequence}
            aria-pressed={playing}
            disabled={prefersReducedMotion}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "Ⅱ" : "▶"}
          </button>
          <button type="button" className={styles.control} aria-label={dict.climate.aria.nextMonth} onClick={() => goTo(current + 1)}>
            →
          </button>
        </div>
        <div className={styles.monthList} role="tablist" aria-label={dict.climate.aria.months}>
          {data.months.map((m, i) => (
            <button
              key={m.month}
              ref={(el) => {
                monthButtonsRef.current[i] = el;
              }}
              type="button"
              className={styles.month}
              role="tab"
              aria-selected={i === current}
              onClick={() => goTo(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  goTo(i + 1, true);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  goTo(i - 1, true);
                } else if (e.key === "Home") {
                  e.preventDefault();
                  goTo(0, true);
                } else if (e.key === "End") {
                  e.preventDefault();
                  goTo(data.months.length - 1, true);
                }
              }}
            >
              {dict.climate.monthAbbrev[m.month] ?? m.month}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
