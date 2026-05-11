import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function getMobileStoreUrl() {
  if (typeof navigator === 'undefined') return 'https://locket.camera';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) {
    return 'https://play.google.com/store/apps/details?id=com.locket.Locket';
  }
  if (/iPad|iPhone|iPod/.test(ua)) {
    return 'https://apps.apple.com/app/locket-widget/id1600373668';
  }
  return 'https://locket.camera';
}

const links = [
  { label: 'Help Center', href: 'https://help.locketcamera.com', external: true },
  { label: 'Artists', href: 'https://locket.camera/artists', external: true },
  { label: 'Press', href: 'mailto:press@locketcamera.com' },
  { label: 'Brand', href: 'https://locket.camera/brand', external: true },
  { label: 'Download', href: 'https://locket.camera', active: true },
];

// Stacked progressive-blur layers. Each band has a stronger blur than the
// last and is masked to its slice of the height, producing a smooth ramp
// from sharp at the bottom to heavy blur at the top of the nav region.
// `solidStart` means the layer is fully opaque from 0%; otherwise it fades in
// from `range[0]`. The heaviest blur layer uses solidStart so the very top
// of the nav region has full coverage with no gap.
const blurLayers = [
  { blur: 16, range: [0,    50],   solidStart: true  },
  { blur: 8,  range: [12.5, 62.5], solidStart: false },
  { blur: 4,  range: [25,   75],   solidStart: false },
  { blur: 2,  range: [50,   87.5], solidStart: false },
  { blur: 1,  range: [75,   100],  solidStart: false },
];

function ramp([a, b]: number[], solidStart = false) {
  const aMid = a + (b - a) * 0.25;
  const bMid = a + (b - a) * 0.75;
  if (solidStart) {
    return `linear-gradient(to bottom, black 0%, black ${bMid}%, transparent ${b}%, transparent 100%)`;
  }
  return `linear-gradient(to bottom, transparent 0%, transparent ${a}%, black ${aMid}%, black ${bMid}%, transparent ${b}%, transparent 100%)`;
}

function NavBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[100px] md:h-[140px] -z-10"
    >
      {blurLayers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: ramp(layer.range, layer.solidStart),
            WebkitMaskImage: ramp(layer.range, layer.solidStart),
          }}
        />
      ))}
      {/* Exponential black-to-transparent fill on top of the blur stack */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, ' +
            'rgba(5,5,5,1) 0%, ' +
            'rgba(5,5,5,1) 8%, ' +
            'rgba(5,5,5,0.85) 20%, ' +
            'rgba(5,5,5,0.6) 40%, ' +
            'rgba(5,5,5,0.32) 60%, ' +
            'rgba(5,5,5,0.12) 78%, ' +
            'rgba(5,5,5,0.04) 90%, ' +
            'rgba(5,5,5,0) 100%)',
        }}
      />
    </div>
  );
}

export function Nav() {
  const [qrOpen, setQrOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function handlePointer(e: PointerEvent) {
      const target = e.target as Node;
      if (
        mobileMenuRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target)
      ) {
        return;
      }
      setMobileOpen(false);
    }
    document.addEventListener('pointerdown', handlePointer);
    return () => document.removeEventListener('pointerdown', handlePointer);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <NavBackdrop />
      <nav className="relative w-full max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-[120px] py-4">
        <a
          href="/"
          className="flex items-center shrink-0 transition-transform duration-200 ease-out active:scale-90"
          aria-label="Locket — home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img
            src="/assets/locket-logo.svg"
            alt="Locket"
            className="h-8 w-auto"
            width={134}
            height={32}
          />
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const baseClass = [
              'inline-flex items-center justify-center px-4 py-2 rounded-full',
              'font-bold text-[17px] leading-[22px] tracking-[0.17px] whitespace-nowrap',
              'transition-all duration-200 ease-out',
              l.active
                ? 'bg-white/10 text-white hover:bg-white/15 cursor-default'
                : 'text-white/80 hover:text-white hover:bg-white/10 active:scale-90',
            ].join(' ');
            return (
            <li
              key={l.label}
              className={`${l.active ? 'ml-1 relative' : ''}`}
              {...(l.active
                ? {
                    onMouseEnter: () => setQrOpen(true),
                    onMouseLeave: () => setQrOpen(false),
                  }
                : {})}
            >
              {l.active ? (
                <span className={baseClass}>{l.label}</span>
              ) : (
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={baseClass}
                >
                  {l.label}
                </a>
              )}

              {l.active && (
                <AnimatePresence>
                  {qrOpen && (
                    <motion.div
                      key="qr"
                      initial={{ opacity: 0, y: -6, filter: 'blur(12px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -6, filter: 'blur(12px)' }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-full pt-3"
                    >
                      <div className="bg-white rounded-[26px] p-5 flex flex-col items-center gap-[13px] shadow-[0_12px_40px_rgba(0,0,0,0.45)] select-none">
                        <div className="relative w-[211px] h-[211px]">
                          <img
                            src="/assets/qr.svg"
                            alt=""
                            aria-hidden
                            width={211}
                            height={211}
                            draggable={false}
                            className="block w-full h-full"
                          />
                          <img
                            src="/assets/happier/app-icon.svg"
                            alt=""
                            aria-hidden
                            draggable={false}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38px] h-[38px]"
                          />
                        </div>
                        <p className="flex items-center gap-2 font-bold text-[19px] leading-[24px] text-[#1a1200] whitespace-nowrap">
                          <img
                            src="/assets/cam.svg"
                            alt=""
                            aria-hidden
                            draggable={false}
                            className="w-6 h-6"
                          />
                          Scan to download!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
            );
          })}
        </ul>

        <div className="md:hidden relative">
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full text-white transition-transform duration-200 ease-out active:scale-90"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <path d="M5 10h18M5 18h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                ref={mobileMenuRef}
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(28px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(28px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="origin-top-right absolute right-0 top-0 w-[160px] rounded-[26px] bg-white/[0.06] backdrop-blur-[12px] ring-1 ring-inset ring-white/15 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.55)] flex flex-col items-stretch gap-1"
              >
                {links.map((l) => {
                  const isDownload = l.active;
                  const href = isDownload ? getMobileStoreUrl() : l.href;
                  const external = isDownload ? true : l.external;
                  const className = [
                    'inline-flex items-center justify-center px-5 py-3 rounded-full',
                    'font-bold text-[17px] leading-[22px] text-white whitespace-nowrap',
                    'transition-transform duration-200 ease-out active:scale-95',
                    isDownload ? 'bg-white/10 hover:bg-white/15' : 'hover:bg-white/5',
                  ].join(' ');
                  return (
                    <a
                      key={l.label}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setMobileOpen(false)}
                      className={className}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
