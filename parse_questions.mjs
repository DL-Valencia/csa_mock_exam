import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Parse all questions from a combined text block extracted from PDFs.
 * The text contains pages separated by "-- N of M --" markers or just concatenated.
 * Each question looks like:
 *   <number>. <question text>
 *   A. <option>
 *   B. <option> ✓ CORRECT ANSWER
 *   C. <option>
 * Correct answer markers can be:
 *   - inline: "B. some text ✓ CORRECT ANSWER"
 *   - split across line: "B. some text ✓ CORRECT\nANSWER"
 *   - on next line: "B. some text\n✓ CORRECT\nANSWER"
 *   - "✓ CORRECT\nANSWER" after option line
 */
function parseQuestions(rawText, source) {
  // Normalize line endings
  let text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Remove page markers like "-- 1 of 23 --"
  text = text.replace(/^--\s*\d+\s*of\s*\d+\s*--$/gm, '');

  // Remove header lines like "ServiceNow CSA — Mock Exam..." and "Printed..."
  text = text.replace(/^ServiceNow CSA[^\n]*/gm, '');
  text = text.replace(/^Printed [^\n]*/gm, '');

  // Collapse the ✓ CORRECT ANSWER variants into a single marker on the option line
  // Pattern: ✓ CORRECT\nANSWER -> ✓ CORRECT ANSWER
  text = text.replace(/✓\s*CORRECT\s*\nANSWER/g, '✓ CORRECT ANSWER');
  // Pattern: \n✓ CORRECT\nANSWER (marker on its own line after option)
  text = text.replace(/\n✓\s*CORRECT\s*\nANSWER/g, ' ✓ CORRECT ANSWER');
  // Remaining standalone ✓ CORRECT ANSWER on its own line - attach to previous line
  text = text.replace(/\n✓ CORRECT ANSWER/g, ' ✓ CORRECT ANSWER');

  // Remove annotation/note lines (lines starting with "The source exam" etc.)
  text = text.replace(/^The source exam[^\n]*/gm, '');

  // Split into lines and clean up
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const questions = [];
  let currentQuestion = null;
  let currentOption = null;

  const questionStartRe = /^(\d+)\.\s+(.+)/;
  const optionStartRe = /^([A-Z])\.\s*(.*)/;

  function saveCurrentOption() {
    if (currentOption && currentQuestion) {
      currentQuestion.options.push(currentOption);
      currentOption = null;
    }
  }

  function saveCurrentQuestion() {
    saveCurrentOption();
    if (currentQuestion && currentQuestion.options.length > 0) {
      questions.push(currentQuestion);
    }
    currentQuestion = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is the start of a new question
    const qMatch = line.match(questionStartRe);
    if (qMatch) {
      const num = parseInt(qMatch[1], 10);
      const qText = qMatch[2];

      // Verify this looks like a question number (sequential or near-sequential)
      // and the next line or content makes sense as a question
      saveCurrentQuestion();

      currentQuestion = {
        num,
        question: qText,
        options: [],
        source,
      };
      currentOption = null;
      continue;
    }

    // Check if this is an option line
    const optMatch = line.match(optionStartRe);
    if (optMatch && currentQuestion) {
      saveCurrentOption();
      const label = optMatch[1];
      let optText = optMatch[2];
      let isCorrect = false;

      if (optText.includes('✓ CORRECT ANSWER')) {
        isCorrect = true;
        optText = optText.replace('✓ CORRECT ANSWER', '').trim();
      }

      currentOption = { label, text: optText, isCorrect };
      continue;
    }

    // If we see a standalone correct answer marker
    if (line.includes('✓ CORRECT ANSWER') && currentOption) {
      currentOption.isCorrect = true;
      // Append any extra text from the line (minus the marker)
      const extra = line.replace('✓ CORRECT ANSWER', '').trim();
      if (extra) currentOption.text += ' ' + extra;
      continue;
    }

    // Continuation of current option text
    if (currentOption && currentQuestion) {
      // Skip lines that look like noise
      if (/^(as a duplicate|normally a Predictive|this looks like)/i.test(line)) continue;
      currentOption.text += ' ' + line;
      continue;
    }

    // Continuation of question text (before first option)
    if (currentQuestion && currentQuestion.options.length === 0) {
      currentQuestion.question += ' ' + line;
    }
  }

  // Save last question
  saveCurrentQuestion();

  return questions;
}

function getFullText(data) {
  // The JSON has a "pages" array with "text" fields, plus sometimes a top-level "text"
  // Use the pages array for cleaner parsing
  if (data.pages && Array.isArray(data.pages)) {
    return data.pages.map(p => p.text).join('\n\n');
  }
  if (data.text) return data.text;
  return '';
}

function determineIsMultiple(questionText) {
  return /choose\s+(two|three|four|five)/i.test(questionText);
}

function cleanQuestion(q) {
  // Remove "(Choose two/three/four)" — keep it for display but clean up extra whitespace
  let text = q.question.trim();
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ');
  return text;
}

// --- Main ---
console.log('Reading source files...');
const raw200 = readFileSync(join(__dirname, 'extracted_200items.txt'), 'utf8');
const raw80 = readFileSync(join(__dirname, 'extracted_80items.txt'), 'utf8');

const data200 = JSON.parse(raw200);
const data80 = JSON.parse(raw80);

const text200 = getFullText(data200);
const text80 = getFullText(data80);

console.log('Parsing 200-item exam...');
const questions200Raw = parseQuestions(text200, '200-item exam');
console.log(`  Raw parsed: ${questions200Raw.length} questions`);

console.log('Parsing 80-item exam...');
const questions80Raw = parseQuestions(text80, '80-item exam');
console.log(`  Raw parsed: ${questions80Raw.length} questions`);

// Deduplicate by question number within each source, keep highest-numbered options
function dedup(questions) {
  const map = new Map();
  for (const q of questions) {
    if (!map.has(q.num) || q.options.length > map.get(q.num).options.length) {
      map.set(q.num, q);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.num - b.num);
}

const questions200 = dedup(questions200Raw);
const questions80 = dedup(questions80Raw);

console.log(`After dedup: ${questions200.length} questions from 200-item, ${questions80.length} from 80-item`);

// Build final array
let id = 1;
const allQuestions = [];

for (const q of questions200) {
  const qt = cleanQuestion(q);
  allQuestions.push({
    id: id++,
    question: qt,
    options: q.options.map(o => ({
      label: o.label,
      text: o.text.replace(/\s+/g, ' ').trim(),
      isCorrect: o.isCorrect,
    })),
    isMultiple: determineIsMultiple(qt),
    source: q.source,
  });
}

for (const q of questions80) {
  const qt = cleanQuestion(q);
  allQuestions.push({
    id: id++,
    question: qt,
    options: q.options.map(o => ({
      label: o.label,
      text: o.text.replace(/\s+/g, ' ').trim(),
      isCorrect: o.isCorrect,
    })),
    isMultiple: determineIsMultiple(qt),
    source: q.source,
  });
}

// Validation
let warnings = 0;
for (const q of allQuestions) {
  const correctCount = q.options.filter(o => o.isCorrect).length;
  if (correctCount === 0) {
    console.warn(`  WARNING: Q${q.id} (source Q${allQuestions.indexOf(q)+1}, "${q.source}") has NO correct answer: "${q.question.substring(0, 60)}..."`);
    warnings++;
  }
  if (q.isMultiple && correctCount < 2) {
    console.warn(`  WARNING: Q${q.id} marked as multiple but only ${correctCount} correct answer(s): "${q.question.substring(0, 60)}..."`);
    warnings++;
  }
  if (!q.isMultiple && correctCount > 1) {
    console.warn(`  WARNING: Q${q.id} not marked multiple but has ${correctCount} correct answers: "${q.question.substring(0, 60)}..."`);
    // Auto-fix
    q.isMultiple = true;
  }
}

console.log(`\nTotal questions: ${allQuestions.length}`);
console.log(`  From 200-item exam: ${questions200.length}`);
console.log(`  From 80-item exam: ${questions80.length}`);
console.log(`  Warnings: ${warnings}`);

const output = JSON.stringify(allQuestions, null, 2);
writeFileSync(join(__dirname, 'questions.json'), output, 'utf8');
console.log('\nSaved to questions.json');

// Print summary
const multipleCount = allQuestions.filter(q => q.isMultiple).length;
console.log(`  Single-answer questions: ${allQuestions.length - multipleCount}`);
console.log(`  Multiple-answer questions: ${multipleCount}`);
