import { mockRepository } from "../lib/content/mockRepository";

const mock = mockRepository.resolveMockWithQuestions("nest-full-mock-001");
if (!mock) {
  console.error("Failed to load mock 'nest-full-mock-001'");
  process.exit(1);
}

console.log("-----------------------------------------");
console.log("Mock Loaded Successfully:");
console.log("ID:", mock.id);
console.log("Exam:", mock.exam);
console.log("Title:", mock.title);
console.log("Duration:", mock.durationMinutes, "minutes");
console.log("Total Questions:", mock.questions.length);
console.log("Total Marks:", mock.totalMarks);
console.log("Evaluated Marks:", mock.evalMarks);

const subjectCounts: Record<string, number> = {};
for (const q of mock.questions) {
  subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
}

console.log("Subject Breakdown:", subjectCounts);
console.log("-----------------------------------------");
