const text = `The oxygen dissociation curve (as percentage saturation versus pO2 of blood) of haemoglobin for a healthy adult individual is shown in the graph. P, Q and R in the graph, respectively, represent pO2 of blood in:

![Oxygen Dissociation Curve](https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786973727/nest_pyqs/2025/diagrams/diagram_bio_2025_q04_1786973724.png)`;

function preprocessMathContent(text) {
  if (!text) return "";

  // If text already has $ or $$, leave it to remark-math
  if (text.includes("$")) return text;

  // Preserve all markdown images and links with temporary placeholders
  const preservedBlocks = [];
  const placeholderPrefix = "___PRESERVED_MD_BLOCK_";
  
  let sanitized = text.replace(/!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)/g, (match) => {
    const idx = preservedBlocks.length;
    preservedBlocks.push(match);
    return `${placeholderPrefix}${idx}___`;
  });

  // Regex to detect isolated LaTeX math expressions with LaTeX macros
  const latexMathPattern = /((?:\\[a-zA-Z]+(?:\{.*?\})*|[A-Za-z0-9\(\)]\s*[\=\+\-\*\/]\s*[A-Za-z0-9\(\)])+(?:[A-Za-z0-9'"`\s\=\+\-\*\/\(\)]*(?:\\sum|\\frac|\\int|\\prod|\\lim|\\alpha|\\beta|\\gamma|\\delta|\\theta|\\pi|\\sigma|\\lambda|\\mu|\\omega|\\ln|\\log)[A-Za-z0-9'"`\s\=\+\-\*\/\(\)\{\}\_\^\\]*)*)/g;

  sanitized = sanitized.replace(latexMathPattern, (match) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.length < 3 || trimmed.startsWith(placeholderPrefix)) return match;
    return `$${trimmed}$`;
  });

  // Restore preserved images and links
  preservedBlocks.forEach((block, idx) => {
    sanitized = sanitized.replace(`${placeholderPrefix}${idx}___`, block);
  });

  return sanitized;
}

const result = preprocessMathContent(text);
console.log("Processed Result:\n", result);
console.log("\nImage URL intact:", result.includes("https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786973727/nest_pyqs/2025/diagrams/diagram_bio_2025_q04_1786973724.png"));
