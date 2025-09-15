// Simple, stable hash → hue (0..360)
export function hueFromString(input: string, seed = 0): number {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h) % 360;
}

export function hslFromString(input: string) {
  const hue = hueFromString(input);
  return `hsl(${hue} 90% 45%)`; // vivid but readable
}
