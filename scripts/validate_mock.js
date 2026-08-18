const fs = require('fs');
const path = './content/nest/mocks/nest/nest-full-mock-001.json';

let raw = fs.readFileSync(path, 'utf8');

// Replace single unescaped backslashes that are not valid JSON escape sequences
const fixed = raw.replace(/\\\\|(\\[^"\\\/bfnrtu])/g, (match, p1) => {
  if (p1) {
    return '\\' + p1;
  }
  return match;
});

try {
  const parsed = JSON.parse(fixed);
  // Ensure totalQuestions matches parsed questions length
  parsed.totalQuestions = parsed.questions.length;
  fs.writeFileSync(path, JSON.stringify(parsed, null, 2), 'utf8');
  console.log('SUCCESS: nest-full-mock-001.json is 100% valid JSON with ' + parsed.questions.length + ' questions.');
} catch (e) {
  console.error('ERROR during parsing:', e.message);
  process.exit(1);
}
