import { motion } from 'framer-motion';
import { BlurhashImage } from './Blurhash';

export const expandSpring = { type: 'spring' as const, stiffness: 170, damping: 22, mass: 1 };

export function ExpandedPhoto({
  layoutId,
  src,
  title,
  subtitle,
  onClose,
  size = 'min(70vh, 90vw)',
  borderWidth = 16,
  borderRadius = 40,
}: {
  layoutId: string;
  src: string;
  title: string;
  subtitle: string;
  onClose: () => void;
  size?: string;
  borderWidth?: number;
  borderRadius?: number;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6"
      data-no-emoji
      onClick={onClose}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        layoutId={layoutId}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 overflow-hidden bg-[#1a1a1a] isolate"
        style={{
          width: size,
          height: size,
          borderWidth,
          borderRadius,
          borderColor: 'var(--color-bg)',
          borderStyle: 'solid',
          boxSizing: 'border-box',
          rotate: 0,
          willChange: 'transform',
        }}
        transition={expandSpring}
      >
        <BlurhashImage
          src={src}
          alt={title}
          className="absolute inset-0 block size-full object-cover"
          draggable={false}
        />
      </motion.div>
      <motion.div
        className="relative z-10 mt-6 text-center pointer-events-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-white font-semibold text-[20px] leading-tight">{title}</div>
        <div className="text-white/60 text-[17px] leading-tight mt-1">{subtitle}</div>
      </motion.div>
    </motion.div>
  );
}
