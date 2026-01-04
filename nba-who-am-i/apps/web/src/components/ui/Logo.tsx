import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  /** Size in pixels or Tailwind class */
  size?: number | string;
}

/**
 * Universe-aware trading card logo
 * Uses CSS variables for dynamic theming:
 * - --universe-gradient-primary: Card border gradient
 * - --universe-gradient-glow: Glow effect
 * - --universe-bg-card: Inner card background
 * - --universe-bg-main: Card bottom stripe
 */
export function Logo({ className, size }: LogoProps) {
  const sizeStyle =
    typeof size === 'number' ? { width: size, height: size } : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      className={cn('w-full h-full', className)}
      style={sizeStyle}
    >
      <defs>
        {/* Card gradient - uses universe primary gradient colors */}
        <linearGradient
          id="logoCardGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="rgb(var(--universe-primary-rgb))"
            stopOpacity={0.9}
          />
          <stop
            offset="50%"
            stopColor="rgb(var(--universe-primary-rgb))"
            stopOpacity={1}
          />
          <stop
            offset="100%"
            stopColor="rgb(var(--universe-secondary-rgb))"
            stopOpacity={0.8}
          />
        </linearGradient>

        {/* Inner card gradient - uses universe background colors */}
        <linearGradient
          id="logoInnerGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#1E1E2E" stopOpacity={1} />
          <stop
            offset="100%"
            stopColor="var(--universe-bg-card)"
            stopOpacity={1}
          />
        </linearGradient>

        <clipPath id="logoInnerClip">
          <rect x="100" y="60" width="200" height="240" rx="12" ry="12" />
        </clipPath>
      </defs>

      {/* Trading card background */}
      <rect
        x="80"
        y="40"
        width="240"
        height="320"
        rx="20"
        ry="20"
        fill="url(#logoCardGradient)"
      />

      {/* Inner card area */}
      <rect
        x="100"
        y="60"
        width="200"
        height="240"
        rx="12"
        ry="12"
        fill="url(#logoInnerGradient)"
      />

      {/* Realistic player silhouette */}
      <g clipPath="url(#logoInnerClip)">
        {/* Shoulders and torso */}
        <path
          d="M 100 300
             C 100 260, 130 240, 160 235
             C 170 230, 175 220, 175 210
             L 175 200
             C 155 195, 145 170, 145 150
             C 145 115, 168 90, 200 90
             C 232 90, 255 115, 255 150
             C 255 170, 245 195, 225 200
             L 225 210
             C 225 220, 230 230, 240 235
             C 270 240, 300 260, 300 300
             Z"
          fill="#2D2D44"
        />
      </g>

      {/* Card bottom stripe */}
      <rect
        x="100"
        y="305"
        width="200"
        height="35"
        fill="var(--universe-bg-main)"
      />
      <rect
        x="100"
        y="328"
        width="200"
        height="12"
        rx="12"
        ry="12"
        fill="var(--universe-bg-main)"
      />

      {/* Decorative lines on bottom - uses universe gradient */}
      <line
        x1="120"
        y1="322"
        x2="180"
        y2="322"
        stroke="url(#logoCardGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="220"
        y1="322"
        x2="280"
        y2="322"
        stroke="url(#logoCardGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
