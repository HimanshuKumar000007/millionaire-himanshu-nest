function preprocessSpecialAndMathContent(text) {
  if (!text) return "";

  // 1. Preserve all markdown images and links with temporary placeholders
  const preservedBlocks = [];
  const placeholderPrefix = "___PRESERVED_MD_BLOCK_";

  let sanitized = text.replace(/!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)/g, (match) => {
    const idx = preservedBlocks.length;
    preservedBlocks.push(match);
    return `${placeholderPrefix}${idx}___`;
  });

  // 2. Preserve existing LaTeX math blocks ($...$ and $$...$$)
  const preservedMath = [];
  const mathPlaceholderPrefix = "___PRESERVED_MATH_BLOCK_";
  sanitized = sanitized.replace(/\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$/g, (match) => {
    const idx = preservedMath.length;
    preservedMath.push(match);
    return `${mathPlaceholderPrefix}${idx}___`;
  });

  // 3. Greek Unicode characters mapping
  const greekUnicodeMap = {
    'Ψ': '\\Psi', 'ψ': '\\psi', 'Δ': '\\Delta', 'λ': '\\lambda', 'μ': '\\mu',
    'θ': '\\theta', 'π': '\\pi', 'σ': '\\sigma', 'ω': '\\omega', 'Ω': '\\Omega',
    'ε': '\\epsilon', 'ρ': '\\rho', 'τ': '\\tau', 'φ': '\\phi', 'Φ': '\\Phi',
    'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'Γ': '\\Gamma', 'η': '\\eta',
    'κ': '\\kappa', 'ν': '\\nu', 'ς': '\\sigma', 'χ': '\\chi', 'ζ': '\\zeta',
    'ħ': '\\hbar'
  };

  // Convert (Ψ_p), Ψp, Ψ_w, Ψs, etc. specifically for plant bio / physics
  sanitized = sanitized.replace(/\(?([Ψψ])\s*[_]?\s*([pswmPSWM])\)?/g, (match, sym, sub) => {
    const lsym = greekUnicodeMap[sym] || '\\Psi';
    return `$(${lsym}_{${sub.toLowerCase()}})$`;
  });

  // Convert standalone Unicode Greek with optional subscripts: e.g. ΔG, ΔH, ΔS, λ_max, θ_1
  sanitized = sanitized.replace(/([ΨψΔλμθπσωΩερτφΦαβγΓηκνςχζħ])([_a-zA-Z0-9^]+)?/g, (match, greek, rest) => {
    const latexCmd = greekUnicodeMap[greek] || greek;
    if (rest) {
      if (rest.startsWith('_') || rest.startsWith('^')) {
        return `$${latexCmd}${rest}$`;
      } else {
        return `$${latexCmd}_{\\text{${rest}}}$`;
      }
    }
    return `$${latexCmd}$`;
  });

  // 4. Auto-wrap unwrapped LaTeX macros: e.g. (\Psi_p), \Psi_p, \frac{a}{b}, \sqrt{x}, \Delta G, etc.
  const allLatexMacros = [
    'Psi', 'psi', 'Phi', 'phi', 'Omega', 'omega', 'Delta', 'delta', 'Sigma', 'sigma',
    'Lambda', 'lambda', 'Theta', 'theta', 'Gamma', 'gamma', 'alpha', 'beta', 'mu', 'nu',
    'tau', 'rho', 'epsilon', 'varepsilon', 'eta', 'zeta', 'kappa', 'chi', 'xi', 'Xi',
    'hbar', 'nabla', 'partial', 'sum', 'prod', 'int', 'oint', 'lim', 'frac', 'sqrt',
    'times', 'cdot', 'pm', 'mp', 'approx', 'neq', 'leq', 'geq', 'infty', 'to',
    'rightarrow', 'leftarrow', 'leftrightarrow', 'rightleftharpoons', 'ln', 'log', 'exp',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'vec', 'hat', 'dot', 'ddot', 'bar', 'text'
  ].join('|');

  const unescapedLatexPattern = new RegExp(
    `(\\(?\\\\(?:${allLatexMacros})(?:\\{[^{}]*\\}|_[a-zA-Z0-9{}]+|\\^[a-zA-Z0-9{}]+|\\([a-zA-Z0-9{}]*\\)|[a-zA-Z0-9_\\^\\{\\}\\\\+\\-*\\/=\\s])*\\)?)`,
    'g'
  );

  sanitized = sanitized.replace(unescapedLatexPattern, (match) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.startsWith(placeholderPrefix) || trimmed.startsWith(mathPlaceholderPrefix)) {
      return match;
    }
    return `$${trimmed}$`;
  });

  // 5. Restore preserved math blocks and images/links
  preservedMath.forEach((block, idx) => {
    sanitized = sanitized.replace(`${mathPlaceholderPrefix}${idx}___`, block);
  });

  preservedBlocks.forEach((block, idx) => {
    sanitized = sanitized.replace(`${placeholderPrefix}${idx}___`, block);
  });

  return sanitized;
}

const cases = [
  "In plant physiology, the turgor pressure potential (\\Psi_p) relates to water potential.",
  "Consider (\\Psi_p), (\\Psi_s), and (\\Psi_w) in guard cells.",
  "The enthalpy change ΔH and free energy ΔG determine spontaneity.",
  "Wavelength is given by λ_max = 500 nm and angular frequency ω = 2πf.",
  "Also check existing math like $E = mc^2$ and images ![Graph](https://res.cloudinary.com/dhb8qmnxt/image/upload/v1/nest_pyqs/2025/fig.png)",
  "Calculate (\\Psi_{p}) + (\\Psi_{s}) = \\Psi_{w}"
];

cases.forEach((c, i) => {
  console.log(`--- Test ${i+1} ---`);
  console.log("Input: ", c);
  console.log("Output:", preprocessSpecialAndMathContent(c));
});
