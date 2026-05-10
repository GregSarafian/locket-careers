const links = [
  { label: 'Help Center', href: 'https://help.locketcamera.com', external: true },
  { label: 'Artists', href: 'https://locket.camera/artists', external: true },
  { label: 'Press', href: 'mailto:press@locketcamera.com' },
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
      className="pointer-events-none absolute inset-x-0 top-0 h-[140px] -z-10"
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
          {links.map((l) => (
            <li key={l.label} className={l.active ? 'ml-1' : ''}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={[
                  'inline-flex items-center justify-center px-4 py-2 rounded-full',
                  'font-bold text-[17px] leading-[22px] tracking-[0.17px] whitespace-nowrap',
                  'transition-all duration-200 ease-out active:scale-90',
                  l.active
                    ? 'bg-white/10 text-white hover:bg-white/15'
                    : 'text-white/80 hover:text-white hover:bg-white/10',
                ].join(' ')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://locket.camera"
          className="md:hidden inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 text-white font-bold text-[15px] transition-transform duration-200 ease-out active:scale-90"
        >
          Download
        </a>
      </nav>
    </header>
  );
}
