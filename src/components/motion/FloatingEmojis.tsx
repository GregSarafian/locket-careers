import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EMOJIS = [
  '❤️', '🔥', '😂', '😍', '🥰', '😊', '✨', '🎉', '😄', '😆',
  '💕', '💖', '💯', '🙌', '🤩', '⭐', '💫', '👀', '😎', '😁',
];

type EmojiInstance = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

function isSuppressedClick(target: EventTarget | null): boolean {
  let el = target as HTMLElement | null;
  while (el) {
    if (el.tagName === 'A') return true;
    if (el.dataset?.noEmoji !== undefined) return true;
    el = el.parentElement;
  }
  return false;
}

export function GlobalClickEmojis() {
  const [emojis, setEmojis] = useState<EmojiInstance[]>([]);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let nextId = 0;
    const recentEmojis: string[] = [];

    const handleClick = (e: MouseEvent) => {
      if (isSuppressedClick(e.target)) return;

      const choices = EMOJIS.filter((em) => !recentEmojis.includes(em));
      const emoji = pick(choices);
      recentEmojis.push(emoji);
      if (recentEmojis.length > 2) recentEmojis.shift();

      const count = 5 + Math.floor(Math.random() * 3);
      const burst: EmojiInstance[] = [];
      for (let i = 0; i < count; i++) {
        burst.push({
          id: nextId++,
          emoji,
          x: e.clientX + rand(-16, 16),
          y: e.clientY,
          size: rand(28, 44),
          duration: rand(1.6, 2.4),
          delay: i * rand(0.06, 0.18),
          driftX: rand(-48, 48),
        });
      }

      setEmojis((prev) => [...prev, ...burst]);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const removeEmoji = (id: number) =>
    setEmojis((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {emojis.map((e) => (
        <motion.span
          key={e.id}
          className="absolute select-none leading-none will-change-transform"
          style={{
            left: e.x,
            top: e.y,
            fontSize: `${e.size}px`,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0.4 }}
          animate={{
            y: -320,
            x: e.driftX,
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.4, 1, 1, 0.8],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            ease: 'easeOut',
            opacity: {
              duration: e.duration,
              delay: e.delay,
              times: [0, 0.1, 0.72, 1],
              ease: 'linear',
            },
          }}
          onAnimationComplete={() => removeEmoji(e.id)}
        >
          {e.emoji}
        </motion.span>
      ))}
    </div>
  );
}
