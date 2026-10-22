const fs = require('fs');
const pdfParse = require('./node_modules/pdf-parse/dist/node/cjs/index.cjs');

async function extractPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

async function main() {
  const files = [
    'exam_data/CSA Mock Exam Reviewer 200 items.pdf',
    'exam_data/CSA Mock Exam Reviewer 80 items.pdf'
  ];

  for (const file of files) {
    console.log(`\n\n===== FILE: ${file} =====\n`);
    const text = await extractPDF(file);
    console.log(text);
  }
}

main().catch(console.error);
