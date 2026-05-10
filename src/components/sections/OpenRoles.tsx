import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { roles, type Role } from '../../data/roles';


function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative inline-block w-[14px] h-[14px] text-white" aria-hidden>
      <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-current" />
      <motion.span
        animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full bg-current"
      />
    </span>
  );
}

// Parses simple inline `**bold**` and `*italic*` markers in role copy.
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

function RoleBody({ role }: { role: Role }) {
  if (!role.body) return null;
  return (
    <div className="font-semibold text-[17px] leading-[26px] text-white/60 space-y-4">
      {role.body.map((block, i) => {
        if (block.kind === 'p') {
          return <p key={i}>{renderInline(block.text)}</p>;
        }
        return (
          <ul key={i} className="list-disc pl-6 space-y-1">
            {block.items.map((item, j) => (
              <li key={j}>
                {renderInline(item.lead)}
                {item.sub && (
                  <>
                    <br />
                    <span>{renderInline(item.sub)}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

function ApplyPill({ href, children = 'Apply' }: { href: string; children?: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 text-white font-bold text-[17px] leading-[22px] tracking-[0.17px] hover:bg-white/15 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.a>
  );
}

function RoleCard({
  role,
  expanded,
  onToggle,
}: {
  role: Role;
  expanded: boolean;
  onToggle: () => void;
}) {
  const expandable = !!role.body;

  return (
    <div className="rounded-[32px] bg-white/5 overflow-hidden">
      <button
        type="button"
        onClick={expandable ? onToggle : undefined}
        aria-expanded={expandable ? expanded : undefined}
        data-no-emoji
        className={[
          'w-full flex items-center justify-between gap-4 p-8 text-left',
          expandable ? 'cursor-pointer' : 'cursor-default',
        ].join(' ')}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="font-bold text-[20px] leading-tight text-white/80 truncate">
            {role.title}
          </span>
          <span className="font-semibold text-[20px] leading-tight text-white/30 truncate">
            {role.location}
          </span>
        </div>

        {expandable ? (
          <span
            className="size-[38px] flex items-center justify-center rounded-full border-[3px] border-white/10 shrink-0"
            aria-hidden
          >
            <PlusMinusIcon open={expanded} />
          </span>
        ) : (
          <div className="flex items-center gap-6 shrink-0">
            <span className="font-bold text-[17px] leading-[22px] tracking-[0.17px] text-white">
              Details
            </span>
            <ApplyPill href={role.applyUrl} />
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expandable && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 flex flex-col gap-6 items-stretch">
              <RoleBody role={role} />
              <div className="flex flex-wrap gap-2 items-center justify-center text-white">
                <ApplyPill href={role.applyUrl}>Apply via Email</ApplyPill>
                <span className="font-bold text-[17px] leading-[22px] tracking-[0.17px]">
                  or reach out to one of us personally
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OpenRoles() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section id="open-roles" className="px-6 md:px-[120px] py-10 scroll-mt-[140px]">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6">
        <h3 className="font-bold text-[28px] leading-tight text-white/80">Open Roles</h3>

        <div className="flex flex-col gap-6">
          {roles.map((r) => (
            <RoleCard
              key={r.slug}
              role={r}
              expanded={openSlug === r.slug}
              onToggle={() => setOpenSlug(openSlug === r.slug ? null : r.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
