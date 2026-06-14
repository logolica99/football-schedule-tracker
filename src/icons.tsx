import type { CSSProperties, ReactNode } from "react";

type IconProps = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

function Icon({
  size = 16,
  color = "currentColor",
  style,
  viewBox = "0 0 24 24",
  children,
  fill = "none",
}: IconProps & { viewBox?: string; children: ReactNode; fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={fill === "none" ? color : "none"}
      strokeWidth={fill === "none" ? 2 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
    >
      {children}
    </svg>
  );
}

export function SoccerBallIcon({ size = 28, color = "#6ee7ff", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M8 8l2.5 4.5M15.5 8L13 12.5M8 16l4-2M16 16l-4-2" />
      <polygon points="12,7 14.5,11 12,15 9.5,11" fill={color} stroke="none" />
    </Icon>
  );
}

export function SearchIcon({ size = 16, color = "rgba(255,255,255,0.35)", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Icon>
  );
}

export function CloseIcon({ size = 14, color = "currentColor", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function ClockIcon({ size = 14, color = "currentColor", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function TimerIcon({ size = 12, color = "currentColor", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style}>
      <circle cx="12" cy="13" r="8" />
      <path d="M9 3h6M12 3v3" />
      <path d="M12 13V9" />
    </Icon>
  );
}

export function HourglassIcon({ size = 16, color = "currentColor", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style}>
      <path d="M6 3h12M6 21h12" />
      <path d="M8 3l4 7-4 7M16 3l-4 7 4 7" />
    </Icon>
  );
}

export function MapPinIcon({ size = 14, color = "currentColor", style }: IconProps) {
  return (
    <Icon size={size} color={color} style={style}>
      <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </Icon>
  );
}

export function LiveDotIcon({ size = 8, color = "#ff6b8a", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      aria-hidden="true"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

export function DefaultFlagIcon({ size = 32, color = "rgba(255,255,255,0.25)", style }: IconProps) {
  const height = Math.round(size * 0.75);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 32 24"
      aria-hidden="true"
      style={{ display: "block", margin: "0 auto", ...style }}
    >
      <rect x="1" y="1" width="30" height="22" rx="3" fill="rgba(255,255,255,0.06)" stroke={color} strokeWidth="1.5" />
      <path d="M1 1l15 11L31 1" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="12" x2="16" y2="23" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function CountryFlag({ code, size = 32, style }: { code?: string; size?: number; style?: CSSProperties }) {
  if (!code) return <DefaultFlagIcon size={size} style={style} />;

  const height = Math.round(size * 0.75);
  return (
    <img
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      width={size}
      height={height}
      alt=""
      loading="lazy"
      style={{ borderRadius: 6, display: "block", margin: "0 auto", objectFit: "cover", border: "1px solid rgba(255,255,255,0.12)", ...style }}
    />
  );
}
