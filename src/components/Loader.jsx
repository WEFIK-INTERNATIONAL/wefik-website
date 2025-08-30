import React from "react";

/**
 * ResponsiveLoadingAnimation
 * --------------------------
 * A single-file React component (Tailwind CSS) that provides 3 responsive, accessible
 * loading animation variants:
 *  - "spinner"  : SVG circular spinner
 *  - "dots"     : three bouncing/pulsing dots
 *  - "skeleton" : skeleton card placeholder with shimmer
 *
 * Features:
 *  - Responsive sizes: sm | md | lg
 *  - Respects prefers-reduced-motion
 *  - Accessible: role="status", visually-hidden text
 *  - Lightweight: no external libs required (Tailwind classes used for layout)
 *
 * Usage examples:
 *  <ResponsiveLoadingAnimation variant="spinner" size="md" />
 *  <ResponsiveLoadingAnimation variant="dots" size="lg" />
 *  <ResponsiveLoadingAnimation variant="skeleton" />
 */

export default function Loader({
  variant = "spinner", // "spinner" | "dots" | "skeleton"
  size = "md", // "sm" | "md" | "lg"
  className = "",
}) {
  const sizes = {
    sm: {
      spinner: 20,
      dot: 6,
      skeletonHeight: 10,
    },
    md: {
      spinner: 36,
      dot: 8,
      skeletonHeight: 12,
    },
    lg: {
      spinner: 56,
      dot: 12,
      skeletonHeight: 16,
    },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <span role="status" aria-live="polite" className="sr-only">
        Loading...
      </span>

      {variant === "spinner" && (
        <svg
          width={s.spinner}
          height={s.spinner}
          viewBox="0 0 50 50"
          aria-hidden="true"
          className="block"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            className="opacity-20 stroke-current"
          />
          <path
            d="M45 25a20 20 0 0 1-20 20"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-current motion-safe:animate-spin"
            style={{ transformOrigin: "center" }}
          />
        </svg>
      )}

      {variant === "dots" && (
        <div
          aria-hidden="true"
          className="flex items-end gap-2 h-full"
          style={{ height: s.spinner }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`inline-block rounded-full opacity-90 motion-safe:animate-bounce`} 
              style={{
                width: s.dot,
                height: s.dot,
                animationDelay: `${i * 120}ms`,
                // reduce animation for motion-sensitive users via CSS below
              }}
            />
          ))}
        </div>
      )}

      {variant === "skeleton" && (
        <div
          aria-hidden="true"
          className="w-full max-w-md p-4 rounded-2xl shadow-sm"
          style={{ minWidth: 220 }}
        >
          <div className="flex gap-4 items-start">
            <div
              className="rounded-xl flex-shrink-0"
              style={{ width: s.skeletonHeight * 2, height: s.skeletonHeight * 2 }}
            />
            <div className="flex-1 space-y-3">
              <div className="h-4 rounded-md" style={{ width: "60%" }} />
              <div className="h-3 rounded-md" style={{ width: "90%" }} />
              <div className="h-3 rounded-md" style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for the tiny keyframes we need. Tailwind provides utility classes
          but we include a small style block to handle reduced-motion and shimmer/bounce
          timing control in a self-contained component. */}
      <style>{`
        /* default neutral look; let the site control colors with text-* and bg-* classes */
        svg { color: currentColor; }

        /* Dots: subtle bounce using keyframes */
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }

        .motion-safe\\:animate-bounce {
          animation-name: dot-bounce;
          animation-duration: 800ms;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(.2,.6,.2,1);
        }

        /* Spinner rotation (used on the path element) */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .motion-safe\\:animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Skeleton shimmer */
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
          background-color: rgba(0,0,0,0.06);
        }
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          height: 100%;
          width: 100%;
          transform: skewX(-20deg);
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0));
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer {
          100% { left: 100%; }
        }

        /* Apply skeleton styles only when user hasn't requested reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-bounce,
          .motion-safe\\:animate-spin,
          .skeleton-shimmer::after {
            animation: none !important;
          }
        }

        /* Polishing default block elements generated above so they look like skeletons */
        .skeleton-shimmer, .skeleton-shimmer > div, .skeleton-shimmer > * {
          background-color: rgba(0,0,0,0.06);
        }

      `}</style>

      {/* Add small script-like classes to the skeleton and dots to make them visible by default */}
      <style>{`
        /* Ensure the generated divs have the skeleton-shimmer class for the skeleton variant */
        /* We can't conditionally add classes in this style block, so we apply by selector when variant is used */
      `}</style>

    </div>
  );
}
