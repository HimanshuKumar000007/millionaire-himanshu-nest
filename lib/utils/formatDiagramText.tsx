import React from "react";

/**
 * Recursively extracts pure string content from any ReactNode (strings, numbers, arrays, elements)
 * without ever producing "[object Object]".
 */
export function extractTextContent(node: React.ReactNode): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props && props.children !== undefined) {
      return extractTextContent(props.children);
    }
  }
  return "";
}

/**
 * Converts raw LaTeX, math symbols, Greek letters, sub/superscripts,
 * and dashes into clean readable text for diagram nodes and cards.
 */
export function cleanDiagramText(raw: any): string {
  if (!raw) return "";
  let text = typeof raw === "string" ? raw : extractTextContent(raw);

  // Eliminate any stray object strings
  text = text.replace(/\[object Object\]/g, "");

  // 1. Convert specific LaTeX commands with content first
  text = text
    .replace(/\\xrightarrow\[(.*?)\]\{([^}]+)\}/g, "──[$1 / $2]──►")
    .replace(/\\xrightarrow\{([^}]+)\}/g, "──[$1]──►")
    .replace(/\\xleftarrow\{([^}]+)\}/g, "◄──[$1]──")
    .replace(/\\text\{--\}/g, "–")
    .replace(/\\text\{—\}/g, "—")
    .replace(/\\text\{([^{}]*)\}/g, "$1")
    .replace(/\\mathrm\{([^{}]*)\}/g, "$1")
    .replace(/\\mathbf\{([^{}]*)\}/g, "$1")
    .replace(/\\mathit\{([^{}]*)\}/g, "$1")
    .replace(/\\textbf\{([^{}]*)\}/g, "$1")
    .replace(/\\textit\{([^{}]*)\}/g, "$1")
    .replace(/\\underline\{([^{}]*)\}/g, "$1")
    .replace(/\\overline\{([^{}]*)\}/g, "$1")
    .replace(/\\overbrace\{([^{}]*)\}/g, "$1")
    .replace(/\\underbrace\{([^{}]*)\}/g, "$1");

  // 2. Math symbols and operators
  text = text
    .replace(/\\approx/g, "≈")
    .replace(/\\times/g, "×")
    .replace(/\\pm/g, "±")
    .replace(/\\mp/g, "∓")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\equiv/g, "≡")
    .replace(/\\gg/g, "≫")
    .replace(/\\ll/g, "≪")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\leftarrow/g, "←")
    .replace(/\\leftrightarrow/g, "↔")
    .replace(/\\longrightarrow/g, "──►")
    .replace(/\\longleftarrow/g, "◄──")
    .replace(/\\implies/g, "⟹")
    .replace(/\\iff/g, "⟺")
    .replace(/\\to/g, "→")
    .replace(/\\uparrow/g, "↑")
    .replace(/\\downarrow/g, "↓")
    .replace(/\\oplus/g, "⊕")
    .replace(/\\odot/g, "⊙")
    .replace(/\\bullet/g, "•")
    .replace(/\\cdots/g, "…")
    .replace(/\\dots/g, "…")
    .replace(/\\ldots/g, "…");

  // 3. Greek letters
  text = text
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\theta/g, "θ")
    .replace(/\\Theta/g, "Θ")
    .replace(/\\pi/g, "π")
    .replace(/\\Pi/g, "Π")
    .replace(/\\sigma/g, "σ")
    .replace(/\\Sigma/g, "Σ")
    .replace(/\\lambda/g, "λ")
    .replace(/\\Lambda/g, "Λ")
    .replace(/\\mu/g, "μ")
    .replace(/\\omega/g, "ω")
    .replace(/\\Omega/g, "Ω")
    .replace(/\\phi/g, "φ")
    .replace(/\\Phi/g, "Φ")
    .replace(/\\psi/g, "ψ")
    .replace(/\\Psi/g, "Ψ")
    .replace(/\\hbar/g, "ħ")
    .replace(/\\nu/g, "ν")
    .replace(/\\eta/g, "η")
    .replace(/\\tau/g, "τ")
    .replace(/\\kappa/g, "κ")
    .replace(/\\rho/g, "ρ")
    .replace(/\\chi/g, "χ");

  // 4. Degrees and structural levels
  text = text
    .replace(/\\circ/g, "°")
    .replace(/\^\\circ/g, "°")
    .replace(/1\^\\circ/g, "1°")
    .replace(/2\^\\circ/g, "2°")
    .replace(/3\^\\circ/g, "3°")
    .replace(/4\^\\circ/g, "4°")
    .replace(/1°/g, "1°")
    .replace(/2°/g, "2°")
    .replace(/3°/g, "3°")
    .replace(/4°/g, "4°");

  // 5. Spacings and sizes
  text = text
    .replace(/\\(?:quad|qquad|Large|large|small|normalsize|huge|Huge|left|right)/g, " ")
    .replace(/\\(?:,|;|:|!|\s)/g, " ");

  // 6. Superscripts and Subscripts
  text = text
    .replace(/\^\{([0-9a-zA-Z\+\-\*\=\(\)]+)\}/g, (_, exp) => convertSuperscripts(exp))
    .replace(/\^([0-9\+\-\*])/g, (_, exp) => convertSuperscripts(exp))
    .replace(/\_\{([0-9a-zA-Z\+\-\*\=\(\)]+)\}/g, (_, sub) => convertSubscripts(sub))
    .replace(/\_([0-9a-zA-Z])/g, (_, sub) => convertSubscripts(sub));

  // 7. General double dash cleanup
  text = text.replace(/--/g, "–");

  // 8. Strip any remaining empty LaTeX wrappers or curly braces
  text = text
    .replace(/text\{\}/g, "")
    .replace(/mathrm\{\}/g, "")
    .replace(/mathbf\{\}/g, "")
    .replace(/\\text/g, "")
    .replace(/\\mathrm/g, "")
    .replace(/\\mathbf/g, "")
    .replace(/\{\}/g, "")
    .replace(/\$([^\$]+)\$/g, "$1")
    .replace(/\$/g, "")
    .replace(/\\/g, "");

  return text.replace(/\s+/g, " ").trim();
}

function convertSuperscripts(exp: string): string {
  const supers: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
    "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ",
    "i": "ⁱ", "n": "ⁿ", "o": "ᵒ", "r": "ʳ", "t": "ᵗ", "x": "ˣ"
  };
  return exp.split("").map((c) => supers[c] || c).join("");
}

function convertSubscripts(sub: string): string {
  const subs: Record<string, string> = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
    "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
    "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
    "a": "ₐ", "e": "ₑ", "o": "ₒ", "x": "ₓ", "i": "ᵢ", "j": "ⱼ",
    "m": "ₘ", "p": "ₚ", "t": "ₜ", "n": "ₙ", "r": "ᵣ", "u": "ᵤ", "v": "ᵥ"
  };
  return sub.split("").map((c) => subs[c] || c).join("");
}

/**
 * Renders cleaned text with bold (**...**) and italic (*...*) support as React Nodes.
 */
export function renderFormattedDiagramText(rawText?: any): React.ReactNode {
  if (!rawText) return null;
  const cleaned = cleanDiagramText(rawText);

  // Split by bold (**...**) and italic (*...*)
  const parts = cleaned.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-extrabold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
