/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Logo Component
 * Geometric angular "F" mark + wordmark
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

interface FitzoLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

/** The geometric angular F icon matching the app icon */
export function FitzoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="20" fill="black" />
      <path
        d="M25 80V20H75L65 35H42V44H62L55 57H42V80H25Z"
        fill="white"
      />
    </svg>
  );
}

/** Full logo with optional wordmark */
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
    <div className={`flex items-center gap-2 ${className}`}>
      <FitzoIcon className={sizes[size].icon} />
      {showWordmark && (
        <span className={`${sizes[size].text} font-bold tracking-tight text-white`}>
          Fitzo
        </span>
      )}
    </div>
  );
}
