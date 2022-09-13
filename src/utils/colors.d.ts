export interface ColorsRgba {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export function hexToRgb(hex: string): ColorsRgba;
