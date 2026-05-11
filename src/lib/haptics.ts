import { WebHaptics } from 'web-haptics';

const haptics = typeof window !== 'undefined' ? new WebHaptics() : null;

export function heavyHaptic() {
  haptics?.trigger([{ duration: 35 }], { intensity: 1 });
}

export function mediumHaptic() {
  haptics?.trigger([{ duration: 25 }], { intensity: 0.7 });
}

export function selectionHaptic() {
  haptics?.trigger([{ duration: 8 }], { intensity: 0.3 });
}
