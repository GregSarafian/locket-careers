import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SVG_URL = '/assets/team/dotted-map.svg';
const FALLOFF_RADIUS = 160;
const MAX_SCALE_BOOST = 1.0;
const ACCENT_FILL = '#FFB800';
const ACCENT_HOVER_RADIUS = 14;
const ACCENT_LABELS = [
  'San Francisco, CA',
  'Los Angeles, CA',
  'Austin, TX',
  'Toronto, CA',
  'New York, NY',
  'Argentina',
  'Vietnam',
];

type Dot = {
  el: SVGPathElement;
  cx: number;
  cy: number;
};

type AccentDot = Dot & {
  label: string;
  xPct: number;
  yPct: number;
};

type HoverState = { label: string; xPct: number; yPct: number };

export function InteractiveDottedMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [hovered, setHovered] = useState<HoverState | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(SVG_URL)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) setSvgMarkup(text);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!svgMarkup) return;
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('class', 'block w-full h-full');
    svg.style.overflow = 'visible';

    const vb = svg.viewBox.baseVal;
    const vbW = vb.width || 894;
    const vbH = vb.height || 429;

    const paths = Array.from(svg.querySelectorAll('path')) as SVGPathElement[];
    const dots: Dot[] = [];
    const accents: AccentDot[] = [];
    for (const el of paths) {
      const bbox = el.getBBox();
      el.style.transformBox = 'fill-box';
      el.style.transformOrigin = 'center';
      el.style.transition = 'transform 150ms ease-out';
      el.style.willChange = 'transform';
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const dot: Dot = { el, cx, cy };
      dots.push(dot);
      if (el.getAttribute('fill') === ACCENT_FILL) {
        accents.push({ ...dot, label: '', xPct: (cx / vbW) * 100, yPct: (cy / vbH) * 100 });
      }
    }
    accents.sort((a, b) => a.cx - b.cx);
    accents.forEach((a, i) => {
      a.label = ACCENT_LABELS[i] ?? '';
    });

    const dirty = new Set<Dot>();
    let pendingPoint: { x: number; y: number } | null = null;
    let rafId: number | null = null;
    let currentAccent: AccentDot | null = null;

    const applyAt = (sx: number, sy: number) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const inv = ctm.inverse();
      const pt = svg.createSVGPoint();
      pt.x = sx;
      pt.y = sy;
      const p = pt.matrixTransform(inv);

      const nextDirty = new Set<Dot>();
      const r = FALLOFF_RADIUS;
      const r2 = r * r;
      for (const dot of dots) {
        const dx = dot.cx - p.x;
        const dy = dot.cy - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const t = 1 - Math.sqrt(d2) / r;
          const eased = t * t * t;
          dot.el.style.transform = `scale(${1 + MAX_SCALE_BOOST * eased})`;
          nextDirty.add(dot);
          dirty.delete(dot);
        }
      }
      for (const dot of dirty) {
        dot.el.style.transform = '';
      }
      dirty.clear();
      for (const dot of nextDirty) dirty.add(dot);

      let nearest: AccentDot | null = null;
      let nearestD2 = ACCENT_HOVER_RADIUS * ACCENT_HOVER_RADIUS;
      for (const a of accents) {
        const dx = a.cx - p.x;
        const dy = a.cy - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < nearestD2) {
          nearestD2 = d2;
          nearest = a;
        }
      }
      if (nearest !== currentAccent) {
        currentAccent = nearest;
        setHovered(
          nearest ? { label: nearest.label, xPct: nearest.xPct, yPct: nearest.yPct } : null
        );
      }
    };

    const flush = () => {
      rafId = null;
      if (pendingPoint) {
        applyAt(pendingPoint.x, pendingPoint.y);
        pendingPoint = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      pendingPoint = { x: e.clientX, y: e.clientY };
      if (rafId == null) rafId = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      pendingPoint = null;
      for (const dot of dirty) {
        dot.el.style.transform = '';
      }
      dirty.clear();
      if (currentAccent !== null) {
        currentAccent = null;
        setHovered(null);
      }
    };

    svg.addEventListener('mousemove', onMove);
    svg.addEventListener('mouseleave', onLeave);

    return () => {
      svg.removeEventListener('mousemove', onMove);
      svg.removeEventListener('mouseleave', onLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [svgMarkup]);

  return (
    <div
      className="relative aspect-[892/426] w-full"
      aria-label="Map showing global team locations"
    >
      {svgMarkup && (
        <div
          ref={containerRef}
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.label}
            className="absolute pointer-events-none font-bold text-white text-sm md:text-base whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            style={{
              left: `${hovered.xPct}%`,
              top: `${hovered.yPct}%`,
              transformOrigin: '50% calc(100% + 10px)',
            }}
            initial={{ opacity: 0, scale: 0, x: '-50%', y: 'calc(-100% - 10px)' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: 'calc(-100% - 10px)' }}
            exit={{ opacity: 0, scale: 0, x: '-50%', y: 'calc(-100% - 10px)' }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {hovered.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
