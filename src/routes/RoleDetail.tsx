import { useParams, Link } from 'react-router-dom';
import { roles, type RoleBlock } from '../data/roles';
import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import { mediumHaptic } from '../lib/haptics';
import NotFound from './NotFound';

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/;
const INLINE_RE = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function renderInline(text: string): React.ReactNode {
  const parts = text.split(INLINE_RE);
  return parts.map((part, i) => {
    const linkMatch = part.match(LINK_RE);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const external = !url.startsWith('mailto:');
      return (
        <a
          key={i}
          href={url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-white underline decoration-[var(--color-text-muted)] hover:decoration-white"
        >
          {label}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(1, -1)}
        </strong>
      );
    }
    if (EMAIL_RE.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-white underline decoration-[var(--color-text-muted)] hover:decoration-white"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderBody(blocks: RoleBlock[]) {
  return blocks.map((block, i) => {
    if (block.kind === 'p') {
      return <p key={i} className="mt-4 leading-relaxed text-[var(--color-text-muted)]">{renderInline(block.text)}</p>;
    }
    return (
      <ul key={i} className="mt-4 list-disc pl-5 space-y-1 text-[var(--color-text-muted)]">
        {block.items.map((item, j) => (
          <li key={j}>
            <span className="text-white">{renderInline(item.lead)}</span>
            {item.sub && <span className="block text-sm mt-0.5">{renderInline(item.sub)}</span>}
          </li>
        ))}
      </ul>
    );
  });
}

export default function RoleDetail() {
  const { slug } = useParams();
  const role = roles.find((r) => r.slug === slug);
  if (!role) return <NotFound />;

  return (
    <>
      <Nav />
      <main className="px-6 pt-32 pb-16 max-w-3xl mx-auto">
        <Link to="/" onClick={mediumHaptic} className="text-sm text-[var(--color-text-muted)] hover:text-white">
          ← Back to careers
        </Link>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">{role.title}</h1>
        {role.location && <div className="mt-2 text-[var(--color-text-muted)]">{role.location}</div>}
        {role.body && <div className="mt-6">{renderBody(role.body)}</div>}
        {role.applyUrl && (
          <a
            href={role.applyUrl}
            onClick={mediumHaptic}
            className="mt-10 inline-block px-6 py-3 rounded-full bg-[var(--color-accent)] text-black font-medium hover:bg-[var(--color-accent-hover)]"
          >
            Apply
          </a>
        )}
      </main>
      <Footer />
    </>
  );
}
