import * as React from "react";

export function ScientificBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 opacity-40">
      {/* Mathematical grid overlay */}
      <div className="absolute inset-0 bg-scientific-grid opacity-60" />

      {/* Orbit 1 */}
      <svg
        className="absolute -top-12 -right-12 w-96 h-96 text-indigo-400/20 animate-spin"
        style={{ animationDuration: "60s" }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <ellipse cx="100" cy="100" rx="80" ry="35" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" transform="rotate(25 100 100)" />
        <ellipse cx="100" cy="100" rx="80" ry="35" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" transform="rotate(-35 100 100)" />
        <circle cx="160" cy="75" r="3" fill="currentColor" />
        <circle cx="40" cy="125" r="2" fill="currentColor" />
      </svg>

      {/* Abstract Benzene / Molecular Structure */}
      <svg
        className="absolute top-1/3 -left-16 w-80 h-80 text-indigo-300/15"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="currentColor" strokeWidth="0.8" />
        <polygon points="50,22 73,35 73,65 50,78 27,65 27,35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="15" r="2.5" fill="currentColor" />
        <circle cx="80" cy="32" r="2.5" fill="currentColor" />
        <circle cx="80" cy="68" r="2.5" fill="currentColor" />
        <circle cx="50" cy="85" r="2.5" fill="currentColor" />
        <circle cx="20" cy="68" r="2.5" fill="currentColor" />
        <circle cx="20" cy="32" r="2.5" fill="currentColor" />
      </svg>

      {/* Subtle scientific equations watermark */}
      <div className="absolute top-20 right-1/4 text-indigo-900/[0.03] text-xs font-mono select-none space-y-1">
        <div>E = m c² | Δx · Δp ≥ ℏ / 2</div>
        <div>iℏ (∂Ψ/∂t) = ĤΨ</div>
        <div>∫ f(x) dx = F(b) - F(a)</div>
        <div>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</div>
      </div>

      <div className="absolute bottom-10 left-1/3 text-indigo-900/[0.03] text-xs font-mono select-none space-y-1">
        <div>F = G (m₁m₂ / r²)</div>
        <div>PV = nRT | λ = h / p</div>
      </div>
    </div>
  );
}
