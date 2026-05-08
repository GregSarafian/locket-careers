import { useParams, Link } from 'react-router-dom';
import { roles, type RoleBlock } from '../data/roles';
import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import NotFound from './NotFound';

function renderBody(blocks: RoleBlock[]) {
  return blocks.map((block, i) => {
    if (block.kind === 'p') {
      return <p key={i} className="mt-4 leading-relaxed text-[var(--color-text-muted)]">{block.text}</p>;
    }
    return (
      <ul key={i} className="mt-4 list-disc pl-5 space-y-1 text-[var(--color-text-muted)]">
        {block.items.map((item, j) => (
          <li key={j}>
            <span className="text-white">{item.lead}</span>
            {item.sub && <span className="block text-sm mt-0.5">{item.sub}</span>}
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
        <Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-white">
          ← Back to careers
        </Link>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">{role.title}</h1>
        <div className="mt-2 text-[var(--color-text-muted)]">{role.location}</div>
        {role.body && <div className="mt-6">{renderBody(role.body)}</div>}
        {role.applyUrl && (
          <a
            href={role.applyUrl}
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
