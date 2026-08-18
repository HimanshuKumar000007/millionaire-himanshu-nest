const text = `The oxygen dissociation curve (as percentage saturation versus pO2 of blood) of haemoglobin for a healthy adult individual is shown in the graph. P, Q and R in the graph, respectively, represent pO2 of blood in:

![Oxygen Dissociation Curve](https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786973727/nest_pyqs/2025/diagrams/diagram_bio_2025_q04_1786973724.png)`;

function preprocessMathContent(text) {
  if (!text) return "";
  if (text.includes("$")) return text;

  const latexMathPattern = /([A-Za-z0-9'"`\s\=\+\-\*\/\(\)]*(?:\\sum|\\frac|\\int|\\prod|\\lim|\\alpha|\\beta|\\gamma|\\delta|\\theta|\\pi|\\sigma|\\lambda|\\mu|\\omega|_[a-zA-Z0-9\{\}]|\^[a-zA-Z0-9\{\}]|\\ln|\\log)[A-Za-z0-9'"`\s\=\+\-\*\/\(\)\{\}\_\^\\]+)/g;

  return text.replace(latexMathPattern, (match) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.length < 3) return match;
    return `$${trimmed}$`;
  });
}

console.log("Output:");
console.log(preprocessMathContent(text));
