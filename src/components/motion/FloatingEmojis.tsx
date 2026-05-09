import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EMOJIS = [
  '❤️', '🔥', '😂', '😍', '🥰', '😊', '✨', '🎉', '😄', '😆',
  '💕', '💖', '💯', '🙌', '🤩', '⭐', '💫', '👀', '😎', '😁',
];

type EmojiInstance = {
  id: number;
  emoji: string;
  xPct: number;
  size: number;
  duration: number;
  innerDelay: number;
  drift: number;
  onTop: boolean;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

function createEmoji(
  id: number,
  emoji: string,
  xPct: number,
  innerDelay: number,
): EmojiInstance {
  return {
    id,
    emoji,
    xPct,
    size: rand(28, 46),
    duration: rand(1.93, 2.64),
    innerDelay,
    drift: rand(-24, 24),
    onTop: Math.random() < 0.5,
  };
}

type Props = {
  /** When `true`, render this layer's emojis on top of photos; otherwise behind. */
  onTop: boolean;
  /** Shared list of currently-floating emojis. */
  emojis: EmojiInstance[];
  /** Called when an emoji finishes its animation. */
  onComplete: (id: number) => void;
};

function EmojiLayer({ onTop, emojis, onComplete }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden md:block ${
        onTop ? 'z-20' : 'z-0'
      }`}
      aria-hidden
    >
      {emojis
        .filter((e) => e.onTop === onTop)
        .map((e) => (
          <motion.span
            key={e.id}
            className="absolute select-none leading-none will-change-transform"
            style={{
              left: `${e.xPct}%`,
              bottom: 0,
              fontSize: `${e.size}px`,
            }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: '-110vh',
              x: e.drift,
              opacity: [0, 0, 0.35, 0.35, 0],
            }}
            transition={{
              duration: e.duration,
              delay: e.innerDelay,
              ease: 'easeIn',
              opacity: {
                duration: e.duration,
                delay: e.innerDelay,
                times: [0, 0.12, 0.28, 0.85, 1],
                ease: 'linear',
              },
            }}
            onAnimationComplete={() => onComplete(e.id)}
          >
            {e.emoji}
          </motion.span>
        ))}
    </div>
  );
}

export function useFloatingEmojis() {
  const [emojis, setEmojis] = useState<EmojiInstance[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let nextId = 0;
    let cancelled = false;
    let timeoutId: number | undefined;
    let nextOnLeft = Math.random() < 0.5;
    // Track the last two emojis used so we never repeat back-to-back or
    // back-to-back-to-back across consecutive bursts.
    const recentEmojis: string[] = [];

    const scheduleBurst = (delayMs: number) => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        // A burst is a tight cluster of the same emoji floating up together,
        // confined to one side so it never crosses the centered text.
        const size = 5 + Math.floor(Math.random() * 3); // 5-7 emojis per burst
        const choices = EMOJIS.filter((e) => !recentEmojis.includes(e));
        const emoji = pick(choices);
        recentEmojis.push(emoji);
        if (recentEmojis.length > 2) recentEmojis.shift();
        const onLeft = nextOnLeft;
        nextOnLeft = !nextOnLeft;
        const bandMin = onLeft ? 3 : 50;
        const bandMax = onLeft ? 50 : 97;
        // Pick a tight cluster center within the side band, then spread
        // emojis ±5% around it (clamped to the band).
        const center = rand(bandMin + 5, bandMax - 5);
        const burst: EmojiInstance[] = [];
        let cursor = 0;
        for (let i = 0; i < size; i++) {
          const xPct = Math.min(
            bandMax,
            Math.max(bandMin, center + rand(-5, 5)),
          );
          burst.push(createEmoji(nextId++, emoji, xPct, cursor));
          cursor += rand(0.15, 0.3); // inner stagger so none start together
        }
        setEmojis((prev) => [...prev, ...burst]);
        // Burst lifetime ≈ duration (1.35–1.85s) + inner stagger
        // (~6 * 0.22s ≈ 1.3s) ≈ 2.7–3.2s. Scheduling the next burst
        // 1.0–1.5s out guarantees the previous cluster is still in the
        // air when the next one starts, so two clusters are always live.
        scheduleBurst(rand(1000, 1500));
      }, delayMs);
    };

    scheduleBurst(600);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const removeEmoji = (id: number) =>
    setEmojis((prev) => prev.filter((e) => e.id !== id));

  return { emojis, removeEmoji };
}

export { EmojiLayer };
