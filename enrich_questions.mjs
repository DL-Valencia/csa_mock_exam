import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('e:/project/csa_mock_exam/questions.json', 'utf8'));

// Topic tags detector based on keywords in CSA
function getTags(qText) {
  const text = qText.toLowerCase();
  const tags = [];
  if (text.includes('flow designer') || text.includes('flow') || text.includes('action') || text.includes('spoke')) tags.push('Flow Designer');
  if (text.includes('access control') || text.includes('acl') || text.includes('role') || text.includes('permission') || text.includes('security')) tags.push('Security & Access');
  if (text.includes('cmdb') || text.includes('configuration item') || text.includes('ci ') || text.includes('dependency')) tags.push('CMDB');
  if (text.includes('catalog') || text.includes('req') || text.includes('ritm') || text.includes('record producer') || text.includes('order guide')) tags.push('Service Catalog');
  if (text.includes('import') || text.includes('transform map') || text.includes('coalesce')) tags.push('Data Migration');
  if (text.includes('update set')) tags.push('Update Sets');
  if (text.includes('client script') || text.includes('ui policy') || text.includes('business rule') || text.includes('script')) tags.push('Scripting & Policies');
  if (text.includes('table') || text.includes('schema') || text.includes('dictionary') || text.includes('sys_id') || text.includes('field')) tags.push('Database & Schema');
  if (text.includes('report') || text.includes('dashboard') || text.includes('analytics')) tags.push('Reporting');
  if (text.includes('notification') || text.includes('email')) tags.push('Notifications');
  if (text.includes('knowledge')) tags.push('Knowledge Management');
  if (tags.length === 0) tags.push('Platform Basics');
  return tags;
}

const enrichedQuestions = questions.map((q, idx) => ({
  ...q,
  globalId: idx + 1,
  tags: getTags(q.question)
}));

console.log(`Enriched ${enrichedQuestions.length} questions with tags.`);
fs.writeFileSync('e:/project/csa_mock_exam/enriched_questions.json', JSON.stringify(enrichedQuestions, null, 2));

