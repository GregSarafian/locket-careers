import { motion } from 'framer-motion';

type LinkGroup = {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
};

const groups: LinkGroup[] = [
  {
    heading: 'Download',
    links: [
      { label: 'iOS', href: 'https://apps.apple.com/app/locket-camera/id1600525061' },
      { label: 'Android', href: 'https://play.google.com/store/apps/details?id=com.locket.Locket' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Privacy Policy', href: 'https://locket.camera/privacy' },
      { label: 'Terms & Conditions', href: 'https://locket.camera/terms' },
      { label: 'Cookie Policy', href: 'https://locket.camera/cookie_policy' },
      { label: 'Brand', href: 'https://locket.camera/brand' },
    ],
  },
  {
    heading: 'Get in Touch',
    links: [
      { label: 'Help Center', href: 'https://help.locketcamera.com', external: true },
      { label: 'Ambassadors', href: 'https://ambassadors.locketcamera.com' },
      { label: 'Artists', href: 'https://locket.camera/artists', external: true },
      { label: 'Press', href: 'mailto:press@locketcamera.com' },
    ],
  },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/locketcamera',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12.0011 0C8.74209 0 8.33309 0.0142459 7.05307 0.0724996C5.77556 0.130998 4.90355 0.33325 4.14054 0.630012C3.35128 0.936503 2.68177 1.3465 2.01477 2.01375C1.34727 2.68076 0.937257 3.35025 0.629758 4.13925C0.332249 4.90251 0.129743 5.77475 0.0722516 7.05175C0.0150042 8.33175 0 8.741 0 12C0 15.259 0.0145039 15.6667 0.0724954 16.9467C0.131255 18.2242 0.333506 19.0963 0.630002 19.8593C0.936757 20.6485 1.34676 21.318 2.01402 21.985C2.68078 22.6525 3.35028 23.0635 4.13904 23.37C4.90254 23.6667 5.77482 23.869 7.05207 23.9275C8.33209 23.9857 8.74084 24 11.9996 24C15.2589 24 15.6667 23.9858 16.9467 23.9275C18.2242 23.869 19.0972 23.6668 19.8607 23.37C20.6497 23.0635 21.3182 22.6525 21.985 21.985C22.6525 21.318 23.0625 20.6485 23.37 19.8595C23.665 19.0963 23.8675 18.224 23.9275 16.947C23.985 15.667 24 15.259 24 12C24 8.74099 23.985 8.33201 23.9275 7.052C23.8675 5.77449 23.665 4.90251 23.37 4.13951C23.0625 3.35025 22.6525 2.68075 21.985 2.01375C21.3175 1.34624 20.65 0.936247 19.86 0.63C19.0949 0.33325 18.2224 0.130998 16.9449 0.0724996C15.6649 0.0142459 15.2574 0 11.9974 0H12.0011ZM10.9246 2.1625C11.2441 2.162 11.6006 2.1625 12.0011 2.1625C15.2052 2.1625 15.5849 2.174 16.8502 2.2315C18.0202 2.28501 18.6552 2.4805 19.0782 2.64475C19.6382 2.86225 20.0375 3.12225 20.4572 3.54225C20.8772 3.96226 21.1372 4.36226 21.3552 4.92225C21.5195 5.34474 21.7152 5.97975 21.7685 7.14976C21.826 8.41475 21.8385 8.79475 21.8385 11.9973C21.8385 15.1997 21.826 15.5798 21.7685 16.8448C21.715 18.0147 21.5195 18.6498 21.3552 19.0723C21.1377 19.6323 20.8772 20.031 20.4572 20.4507C20.0372 20.8708 19.6384 21.1307 19.0782 21.3482C18.6557 21.5133 18.0202 21.7082 16.8502 21.7618C15.5852 21.8192 15.2052 21.8317 12.0011 21.8317C8.79684 21.8317 8.41709 21.8192 7.15207 21.7618C5.98207 21.7078 5.34706 21.5123 4.9238 21.348C4.3638 21.1305 3.96378 20.8705 3.54379 20.4505C3.12378 20.0305 2.86379 19.6315 2.64577 19.0712C2.48152 18.6488 2.28577 18.0137 2.23253 16.8438C2.17502 15.5787 2.16352 15.1988 2.16352 11.9943C2.16352 8.78976 2.17502 8.41174 2.23253 7.14675C2.28603 5.97675 2.48152 5.34175 2.64577 4.91875C2.86327 4.35875 3.12378 3.95875 3.54379 3.53876C3.96378 3.11875 4.3638 2.85875 4.9238 2.64075C5.34681 2.47575 5.98207 2.28076 7.15207 2.227C8.25908 2.177 8.68809 2.162 10.9246 2.15949L10.9246 2.1625ZM18.4067 4.155C17.6117 4.155 16.9667 4.79926 16.9667 5.59449C16.9667 6.3895 17.6117 7.0345 18.4067 7.0345C19.2017 7.0345 19.8467 6.3895 19.8467 5.59449C19.8467 4.7995 19.2017 4.15451 18.4067 4.15451L18.4067 4.155ZM12.0011 5.8375C8.59783 5.8375 5.83857 8.59675 5.83857 12C5.83857 15.4033 8.59783 18.1612 12.0011 18.1612C15.4044 18.1612 18.1627 15.4033 18.1627 12C18.1627 8.59675 15.4042 5.8375 12.0009 5.8375H12.0011ZM12.0011 8C14.2101 8 16.0012 9.79075 16.0012 12C16.0012 14.209 14.2101 16 12.0011 16C9.79186 16 8.00109 14.209 8.00109 12C8.00109 9.79075 9.79186 8 12.0011 8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/locketcamera',
    icon: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" aria-hidden>
        <path d="M18.6571 0.2439C18.7992 0.0885089 19 0 19.2106 0H20.8677C21.5183 0 21.8603 0.771769 21.4233 1.25378L14.4801 8.91144L22.974 19.7884C23.3585 20.2808 23.0076 21 22.3828 21H16.8755C16.646 21 16.4291 20.8949 16.2869 20.7148L10.7121 13.6539L4.29545 20.7529C4.15326 20.9102 3.95111 21 3.73906 21H2.07375C1.4248 21 1.08213 20.2317 1.51575 19.7489L8.95212 11.4686L0.86926 1.21428C0.481511 0.722365 0.831911 0 1.45828 0H7.13819C7.36913 0 7.5872 0.106394 7.72933 0.288417L12.7441 6.7107L18.6571 0.2439ZM17.442 18.7178C17.5368 18.8378 17.6813 18.9077 17.8342 18.9077H19.222C19.3887 18.9077 19.4822 18.7159 19.3796 18.5846L6.58226 2.2069C6.4875 2.08563 6.34217 2.01476 6.18827 2.01476H4.65313C4.48597 2.01476 4.39257 2.20764 4.49622 2.33878L17.442 18.7178Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@locketcamera',
    icon: (
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden>
        <path d="M11.614 0.846978C12.9212 0.828125 14.2208 0.839297 15.5189 0.828125C15.5976 2.25332 16.1474 3.70505 17.2665 4.71268C18.3833 5.74544 19.9631 6.21817 21.5002 6.37808V10.1271C20.0597 10.0831 18.6125 9.80389 17.3054 9.22568C16.7361 8.98548 16.2058 8.67614 15.6867 8.35981C15.68 11.0803 15.6987 13.7973 15.668 16.5067C15.5901 17.8083 15.1294 19.1036 14.3174 20.1762C13.0111 21.9617 10.7436 23.1257 8.4148 23.162C6.98634 23.2381 5.55938 22.8751 4.34215 22.206C2.32492 21.0972 0.905449 19.0673 0.698708 16.8887C0.674738 16.4229 0.666498 15.9579 0.686723 15.5032C0.866498 13.7317 1.80657 12.0369 3.26575 10.8841C4.91968 9.54131 7.23653 8.90168 9.40581 9.28015C9.42604 10.6592 9.36686 12.0369 9.36686 13.4161C8.37585 13.1172 7.2178 13.201 6.35188 13.7618C5.71967 14.1437 5.23953 14.7289 4.98934 15.3908C4.7826 15.8628 4.84177 16.3873 4.85376 16.8887C5.09121 18.4165 6.66724 19.7006 8.34963 19.5617C9.46499 19.5505 10.5339 18.9472 11.1152 18.0638C11.3032 17.7545 11.5137 17.4382 11.5249 17.0744C11.623 15.4089 11.5841 13.7505 11.5961 12.0851C11.6043 8.33188 11.5841 4.58908 11.6148 0.847676L11.614 0.846978Z" fill="currentColor" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative px-6 md:px-[120px] py-10 mt-16">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex flex-col gap-6 items-start">
            <a href="/" aria-label="Locket — home">
              <img
                src="/assets/locket-logo.svg"
                alt="Locket"
                className="h-8 w-auto"
                width={134}
                height={32}
              />
            </a>
            <ul className="flex items-center gap-6 text-white/40">
              {socials.map((s) => (
                <li key={s.label}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileTap={{ scale: 0.9 }}
                    className="inline-flex items-center justify-center hover:text-white transition-colors"
                  >
                    {s.icon}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-[15px] text-white/40">
              © {new Date().getFullYear()} Locket Labs, Inc.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-8 text-[17px] text-center">
            {groups.map((g) => (
              <div key={g.heading} className="w-[200px] flex flex-col items-start gap-4">
                <p className="font-bold text-white/80">{g.heading}</p>
                {g.links.map((l) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    whileTap={{ scale: 0.9 }}
                    className="font-semibold text-white/40 hover:text-white/80 transition-colors"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6" style={{ containerType: 'inline-size' }}>
          <p
            aria-hidden
            className="font-black tracking-[0.01em] leading-none whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(24px, 10cqw, 120px)',
              backgroundImage:
                'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            BEST FRIENDS FIRST
          </p>
        </div>
      </div>
    </footer>
  );
}
