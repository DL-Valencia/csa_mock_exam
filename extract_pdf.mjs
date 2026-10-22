import { PDFParse } from 'pdf-parse';
import { readFileSync, writeFileSync } from 'fs';

async function extractPDF(filePath) {
  const dataBuffer = readFileSync(filePath);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  return result;
}

async function main() {
  const files = [
    { path: 'exam_data/CSA Mock Exam Reviewer 200 items.pdf', name: '200items' },
    { path: 'exam_data/CSA Mock Exam Reviewer 80 items.pdf', name: '80items' }
  ];

  for (const file of files) {
    console.log(`Extracting: ${file.path}`);
    const result = await extractPDF(file.path);
    const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    writeFileSync(`extracted_${file.name}.txt`, text, 'utf8');
    console.log(`  -> Saved (${text.length} chars)`);
    console.log('Preview:', text.substring(0, 500));
    console.log('\n---\n');
  }
}

main().catch(e => { console.error(e); process.exit(1); });

