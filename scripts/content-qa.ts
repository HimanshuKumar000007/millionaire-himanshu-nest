import { contentQAService } from "../lib/content/contentQA";

console.log("==================================================");
console.log("             NEST SMARTPREP CONTENT QA            ");
console.log("==================================================");

const res = contentQAService.validateAllContent();

console.log("\nCONTENT SUMMARY:");
console.log("--------------------------------------------------");

console.log("Questions:");
Object.entries(res.summary.questions).forEach(([subj, count]) => {
  console.log(`  ✓ ${subj}: ${count}`);
});

console.log("\nLessons:");
Object.entries(res.summary.lessons).forEach(([subj, count]) => {
  console.log(`  ✓ ${subj}: ${count}`);
});

console.log("\nPYQs:");
Object.entries(res.summary.pyqs).forEach(([subj, count]) => {
  console.log(`  ✓ ${subj}: ${count}`);
});

console.log("\nMocks:");
Object.entries(res.summary.mocks).forEach(([exam, count]) => {
  console.log(`  ✓ ${exam}: ${count}`);
});

console.log("\nCONTENT SOURCE CLASSIFICATION:");
console.log("--------------------------------------------------");
console.log(`Development Examples:`);
console.log(`  - Questions : ${res.summary.developmentExamples.questions}`);
console.log(`  - Lessons   : ${res.summary.developmentExamples.lessons}`);
console.log(`  - PYQs      : ${res.summary.developmentExamples.pyqs}`);
console.log(`  - Mocks     : ${res.summary.developmentExamples.mocks}`);

console.log(`Production Content:`);
console.log(`  - Questions : ${res.summary.productionItems.questions}`);
console.log(`  - Lessons   : ${res.summary.productionItems.lessons}`);
console.log(`  - PYQs      : ${res.summary.productionItems.pyqs}`);
console.log(`  - Mocks     : ${res.summary.productionItems.mocks}`);

console.log("\nVALIDATION CHECKS:");
console.log("--------------------------------------------------");
console.log("  ✓ JSON Format Integrity");
console.log("  ✓ Stable ID Uniqueness");
console.log("  ✓ Question Schema (MCQ / MSQ / Numerical)");
console.log("  ✓ Lesson Structural Completeness");
console.log("  ✓ PYQ Schema & Years");
console.log("  ✓ Mock Question Reference Existence");
console.log("  ✓ Mock Total Questions Match");
console.log("  ✓ Syllabus Hierarchy (Biology, Physics, Chemistry, Mathematics)");

if (res.warnings.length > 0) {
  console.log("\nWARNINGS:");
  res.warnings.forEach((w) => console.log(`  [!] ${w}`));
}

if (!res.passed) {
  console.log("\nRESULT: FAIL ❌");
  console.log(`\nERRORS (${res.totalErrors}):`);
  res.errors.forEach((err) => console.log(`  ✖ ${err}`));
  process.exit(1);
} else {
  console.log("\nRESULT: PASS ✅");
  console.log("All file-based content passed QA validation cleanly.");
  process.exit(0);
}
