/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Logo
 *
 * The mark is a plate, not a sticker: on the black ground it reads as a milled
 * white tile with the F cut out of it. (The previous black-on-black plate was
 * invisible on this world — only the glyph survived.)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

interface FitzoLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

/** The angular F mark, cut out of a white plate. */
export function FitzoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Fitzo"
    >
      <defs>
        <linearGradient id="fitzo-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dedee2" />
        </linearGradient>
        <mask id="fitzo-cut">
          <rect width="100" height="100" fill="white" />
          <path d="M25 80V20H75L65 35H42V44H62L55 57H42V80H25Z" fill="black" />
        </mask>
      </defs>
      <rect
        width="100"
        height="100"
        rx="22"
        fill="url(#fitzo-plate)"
        mask="url(#fitzo-cut)"
      />
    </svg>
  );
}

/** Full logo with optional wordmark. */
export default function FitzoLogo({
  className = "",
  showWordmark = true,
  size = "md",
}: FitzoLogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-xl" },
    lg: { icon: "w-10 h-10", text: "text-2xl" },
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <FitzoIcon className={sizes[size].icon} />
      {showWordmark && (
        <span
          className={`${sizes[size].text} font-extrabold tracking-[-0.03em] text-white`}
        >
          Fitzo
        </span>
      )}
    </div>
  );
}
