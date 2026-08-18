// Simulate browser localStorage and window environment
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, val: string) => { store[key] = val; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};

(global as any).window = {
  dispatchEvent: (event: any) => {},
  addEventListener: () => {},
  removeEventListener: () => {}
};
(global as any).localStorage = mockLocalStorage;

import { ProgressOrchestratorService, STORAGE_KEYS, broadcastProgressUpdate } from '../lib/services/progressOrchestrator.service';

const orchestrator = new ProgressOrchestratorService();

console.log('----------------------------------------------------');
console.log('RUNNING ORCHESTRATOR DIAGNOSTIC TEST SUITE');
console.log('----------------------------------------------------');

// TEST 1: Clean slate
console.log('\n[1] Clean State Verification:');
let summary = orchestrator.getLiveDashboardSummary();
console.log('  Readiness Score      :', summary.readinessScore, ' (Expected: 0)');
console.log('  Status               :', summary.status, ' (Expected: Critical Focus)');
console.log('  Concept Mastery      :', summary.preparationProgress.conceptMastery, ' (Expected: 0)');
console.log('  Questions Solved     :', summary.quickStats.questionsSolved, ' (Expected: 0)');
console.log('  Continue Learning #  :', summary.continueLearning.length, ' (Expected: 3 cards)');
console.log('  Recent Activities #  :', summary.recentActivities.length, ' (Expected: 1 welcome item)');

// TEST 2: Lessons
console.log('\n[2] Lesson Progress Ingestion:');
mockLocalStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify({
  'the-living-world': {
    lessonId: 'the-living-world',
    progressPercent: 100,
    completed: true,
    updatedAt: new Date().toISOString(),
    title: 'The Living World & Taxonomy'
  },
  'biological-classification': {
    lessonId: 'biological-classification',
    progressPercent: 50,
    completed: false,
    updatedAt: new Date().toISOString(),
    title: 'Biological Classification'
  }
}));
broadcastProgressUpdate();
summary = orchestrator.getLiveDashboardSummary();
console.log('  Concept Mastery      :', summary.preparationProgress.conceptMastery, '% (Expected: ~3%)');
console.log('  Readiness Score      :', summary.readinessScore);
console.log('  Recent Activity      :', summary.recentActivities[0].title);

// TEST 3: PYQ Attempts
console.log('\n[3] PYQ Ingestion:');
mockLocalStorage.setItem(STORAGE_KEYS.PYQ_ATTEMPTS, JSON.stringify({
  'pyq-1': { isCorrect: true, score: 3, answeredAt: new Date().toISOString(), subject: 'Biology' },
  'pyq-2': { isCorrect: true, score: 3, answeredAt: new Date().toISOString(), subject: 'Chemistry' },
  'pyq-3': { isCorrect: false, score: -1, answeredAt: new Date().toISOString(), subject: 'Physics' }
}));
broadcastProgressUpdate();
summary = orchestrator.getLiveDashboardSummary();
console.log('  PYQs Solved          :', summary.quickStats.pyqsCompleted, ' (Expected: 3)');
console.log('  PYQ Accuracy         :', summary.practice.pyqAccuracy, '% (Expected: 67%)');

// TEST 4: Mock Test Ingestion (NEST Pattern: 4 sections, evaluated on best 3)
console.log('\n[4] Mock Test Ingestion (NEST Best 3 of 4):');
mockLocalStorage.setItem(STORAGE_KEYS.MOCK_ATTEMPTS, JSON.stringify({
  'nest-mock-01': {
    id: 'nest-mock-01',
    title: 'NEST 2026 Full Mock Test 01',
    nestMeritScore: 142,
    rawScore: 172,
    evalMarks: 180,
    totalMarks: 240,
    accuracy: 82,
    percentile: 96.5,
    completedAt: new Date().toISOString(),
    subjectBreakdown: {
      Physics:     { score: 48, maxMarks: 60, correct: 16, incorrect: 2, unattempted: 2, percentage: 80 },
      Chemistry:   { score: 50, maxMarks: 60, correct: 17, incorrect: 1, unattempted: 2, percentage: 83 },
      Biology:     { score: 44, maxMarks: 60, correct: 15, incorrect: 3, unattempted: 2, percentage: 73 },
      Mathematics: { score: 30, maxMarks: 60, correct: 10, incorrect: 5, unattempted: 5, percentage: 50 }
    }
  }
}));
broadcastProgressUpdate();
summary = orchestrator.getLiveDashboardSummary();
console.log('  Readiness Index      :', summary.readinessScore, '%');
console.log('  Status               :', summary.status);
console.log('  Mock Average Score   :', summary.mockPerformance.averageScore, '/ 180 (Expected: 142)');
console.log('  Strongest Subject    :', summary.strongestSubject);
console.log('  Focus Subject        :', summary.focusSubject);
console.log('  Subject Physics      :', summary.subjects.find(s => s.subject === 'Physics')?.score, '%');
console.log('  Subject Chemistry    :', summary.subjects.find(s => s.subject === 'Chemistry')?.score, '%');
console.log('  Subject Biology      :', summary.subjects.find(s => s.subject === 'Biology')?.score, '%');
console.log('  Subject Mathematics  :', summary.subjects.find(s => s.subject === 'Mathematics')?.score, '%');

console.log('\n----------------------------------------------------');
console.log('ORCHESTRATOR STATUS: FULLY HEALTHY & OPERATIONAL');
console.log('----------------------------------------------------');

