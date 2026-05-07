import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type StaggerProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  stagger?: number;
};

export function Stagger({ children, delay = 0, stagger = 0.08, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
