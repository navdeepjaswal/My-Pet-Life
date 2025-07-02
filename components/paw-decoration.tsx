export default function PawDecoration({
    className = "",
    size = "w-8 h-8",
  }: {
    className?: string;
    size?: string;
  }) {
    return (
      <svg
        className={`${size} text-rose-300 opacity-60 ${className}`}
        viewBox="0 0 64 64"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Toe Pads */}
        <circle cx="20" cy="16" r="6" />
        <circle cx="32" cy="12" r="6" />
        <circle cx="44" cy="16" r="6" />
        {/* Main Pad */}
        <path d="M32 28c-12 0-20 10-20 18s8 14 20 14 20-6 20-14-8-18-20-18z" />
      </svg>
    );
  }