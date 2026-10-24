import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('e:/project/csa_mock_exam/enriched_questions.json', 'utf8'));
const questionsJSON = JSON.stringify(questions);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ServiceNow CSA Mock Exam & Study Hub (280 Questions)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --bg-app: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-subtle: #f1f5f9;
      --border-color: #e2e8f0;
      --border-subtle: #cbd5e1;
      
      --text-main: #0f172a;
      --text-muted: #64748b;
      --text-subtle: #94a3b8;
      
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --primary-light: #e0f2fe;
      --primary-glow: rgba(2, 132, 199, 0.15);
      
      --sn-green: #10b981;
      --sn-green-dark: #059669;
      --sn-green-light: #ecfdf5;
      
      --danger: #ef4444;
      --danger-light: #fef2f2;
      --warning: #f59e0b;
      --warning-light: #fffbeb;
      
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-xl: 20px;
    }

    [data-theme="dark"] {
      --bg-app: #090d16;
      --bg-card: #131b2e;
      --bg-card-subtle: #1c2640;
      --border-color: #23304e;
      --border-subtle: #2d3d63;
      
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-subtle: #64748b;
      
      --primary: #38bdf8;
      --primary-hover: #0ea5e9;
      --primary-light: rgba(56, 189, 248, 0.12);
      --primary-glow: rgba(56, 189, 248, 0.2);
      
      --sn-green: #34d399;
      --sn-green-dark: #10b981;
      --sn-green-light: rgba(52, 211, 153, 0.12);
      
      --danger: #f87171;
      --danger-light: rgba(248, 113, 113, 0.12);
      --warning: #fbbf24;
      --warning-light: rgba(251, 191, 36, 0.12);
      
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
      --shadow-lg: 0 10px 20px -3px rgb(0 0 0 / 0.5);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }

    body {
      font-family: var(--font-main);
      background-color: var(--bg-app);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.5;
    }

    /* HEADER */
    header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: var(--shadow-sm);
    }

    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.75rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #0284c7 0%, #10b981 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 1.15rem;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
    }

    .brand-text h1 {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .brand-text h1 .badge {
      font-size: 0.65rem;
      font-weight: 700;
      padding: 0.15rem 0.45rem;
      background: var(--sn-green-light);
      color: var(--sn-green-dark);
      border: 1px solid var(--sn-green);
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .brand-text p {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .nav-tabs {
      display: flex;
      align-items: center;
      background: var(--bg-card-subtle);
      padding: 0.25rem;
      border-radius: var(--radius-md);
      gap: 0.2rem;
    }

    .nav-tab {
      padding: 0.4rem 0.85rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      border: none;
      background: transparent;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .nav-tab:hover {
      color: var(--text-main);
    }

    .nav-tab.active {
      background: var(--bg-card);
      color: var(--primary);
      box-shadow: var(--shadow-sm);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }

    .icon-btn:hover {
      color: var(--text-main);
      border-color: var(--border-subtle);
      background: var(--bg-card-subtle);
    }

    /* MAIN CONTAINER */
    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 1.5rem 1.25rem 3rem;
    }

    .view-section {
      display: none;
    }

    .view-section.active {
      display: block;
      animation: fadeIn 0.25s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* DASHBOARD */
    .hero-banner {
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 1.75rem 2rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      position: relative;
      overflow: hidden;
    }

    .hero-content h2 {
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 0.4rem;
    }

    .hero-content p {
      color: var(--text-muted);
      font-size: 0.95rem;
      max-width: 580px;
    }

    .stats-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }

    .stat-info h3 {
      font-size: 1.4rem;
      font-weight: 800;
      line-height: 1.1;
    }

    .stat-info p {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* PRACTICE MODES GRID */
    .modes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .mode-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .mode-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .mode-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.8rem;
    }

    .mode-badge.primary { background: var(--primary-light); color: var(--primary); }
    .mode-badge.success { background: var(--sn-green-light); color: var(--sn-green-dark); }
    .mode-badge.warning { background: var(--warning-light); color: var(--warning); }
    .mode-badge.danger { background: var(--danger-light); color: var(--danger); }

    .mode-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }

    .mode-card p {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: 1.25rem;
      line-height: 1.45;
    }

    .mode-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.55rem 1.15rem;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    .btn-secondary {
      background: var(--bg-card-subtle);
      border-color: var(--border-color);
      color: var(--text-main);
    }

    .btn-secondary:hover {
      background: var(--border-color);
    }

    .btn-outline {
      background: transparent;
      border-color: var(--border-subtle);
      color: var(--text-main);
    }

    .btn-outline:hover {
      background: var(--bg-card-subtle);
      border-color: var(--primary);
      color: var(--primary);
    }

    .btn-success {
      background: var(--sn-green);
      color: white;
    }

    .btn-success:hover {
      background: var(--sn-green-dark);
    }

    /* TOPIC BADGES */
    .topics-section {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .topic-item {
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-card-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    .topic-item:hover {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    .topic-name {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .topic-count {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      background: var(--bg-card);
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
    }

    /* SESSION VIEW (STUDY & EXAM) */
    .session-header {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1rem 1.25rem;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      box-shadow: var(--shadow-sm);
    }

    .session-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .progress-bar-container {
      flex: 1;
      max-width: 320px;
      height: 8px;
      background: var(--bg-card-subtle);
      border-radius: 9999px;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--sn-green));
      width: 0%;
      transition: width 0.3s ease;
    }

    .timer-display {
      font-family: var(--font-mono);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
      background: var(--bg-card-subtle);
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .timer-display.low-time {
      color: var(--danger);
      background: var(--danger-light);
      border-color: var(--danger);
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .session-body {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 1.25rem;
      align-items: start;
    }

    @media (max-width: 900px) {
      .session-body {
        grid-template-columns: 1fr;
      }
    }

    /* QUESTION CARD */
    .question-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .q-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .q-tags {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tag-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      background: var(--bg-card-subtle);
      color: var(--text-muted);
      border: 1px solid var(--border-color);
    }

    .q-type-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      background: var(--primary-light);
      color: var(--primary);
    }

    .question-text {
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.55;
      color: var(--text-main);
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
      padding: 1rem 1.25rem;
      border-radius: var(--radius-md);
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      cursor: pointer;
      user-select: none;
      position: relative;
    }

    .option-item:hover:not(.locked) {
      border-color: var(--primary);
      background: var(--bg-card-subtle);
    }

    .option-item.selected {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    .option-item.correct {
      border-color: var(--sn-green) !important;
      background: var(--sn-green-light) !important;
    }

    .option-item.incorrect {
      border-color: var(--danger) !important;
      background: var(--danger-light) !important;
    }

    .option-item.missed {
      border-color: var(--sn-green) !important;
      border-style: dashed !important;
      background: var(--sn-green-light) !important;
    }

    .opt-letter {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--text-muted);
    }

    .option-item.selected .opt-letter {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }

    .option-item.correct .opt-letter {
      background: var(--sn-green);
      color: white;
      border-color: var(--sn-green);
    }

    .option-item.incorrect .opt-letter {
      background: var(--danger);
      color: white;
      border-color: var(--danger);
    }

    .opt-text {
      font-size: 0.95rem;
      color: var(--text-main);
      padding-top: 0.15rem;
      flex: 1;
    }

    .opt-status-icon {
      font-size: 1.1rem;
      display: none;
    }

    .option-item.correct .opt-status-icon {
      display: block;
      color: var(--sn-green-dark);
    }

    .option-item.incorrect .opt-status-icon {
      display: block;
      color: var(--danger);
    }

    /* FEEDBACK CARD */
    .feedback-box {
      border-radius: var(--radius-md);
      padding: 1.25rem;
      display: none;
    }

    .feedback-box.active {
      display: block;
      animation: fadeIn 0.2s ease;
    }

    .feedback-box.correct {
      background: var(--sn-green-light);
      border: 1px solid var(--sn-green);
      color: var(--sn-green-dark);
    }

    .feedback-box.incorrect {
      background: var(--danger-light);
      border: 1px solid var(--danger);
      color: #991b1b;
    }

    .feedback-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .feedback-explanation {
      font-size: 0.88rem;
      line-height: 1.5;
    }

    /* QUESTION NAV / CONTROLS */
    .q-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
      flex-wrap: wrap;
    }

    /* SIDEBAR PALETTE */
    .palette-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      box-shadow: var(--shadow-sm);
    }

    .palette-title {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .palette-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.4rem;
      max-height: 380px;
      overflow-y: auto;
      padding-right: 0.25rem;
    }

    .pal-btn {
      aspect-ratio: 1;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-card-subtle);
      color: var(--text-main);
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .pal-btn:hover {
      border-color: var(--primary);
    }

    .pal-btn.current {
      outline: 2px solid var(--primary);
      outline-offset: 1px;
    }

    .pal-btn.answered {
      background: var(--primary-light);
      color: var(--primary);
      border-color: var(--primary);
    }

    .pal-btn.correct {
      background: var(--sn-green-light);
      color: var(--sn-green-dark);
      border-color: var(--sn-green);
    }

    .pal-btn.incorrect {
      background: var(--danger-light);
      color: var(--danger);
      border-color: var(--danger);
    }

    .pal-btn.flagged::after {
      content: '';
      position: absolute;
      top: 2px;
      right: 2px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--warning);
    }

    .palette-legend {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-color);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }

    /* NOTES BOX */
    .notes-box {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .notes-textarea {
      width: 100%;
      min-height: 70px;
      padding: 0.6rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-card-subtle);
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.85rem;
      resize: vertical;
    }

    /* RESULTS VIEW */
    .results-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 2.5rem 2rem;
      text-align: center;
      box-shadow: var(--shadow-md);
      margin-bottom: 2rem;
    }

    .results-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1.25rem;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    .results-badge.pass {
      background: var(--sn-green-light);
      color: var(--sn-green-dark);
      border: 2px solid var(--sn-green);
    }

    .results-badge.fail {
      background: var(--danger-light);
      color: var(--danger);
      border: 2px solid var(--danger);
    }

    .score-big {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .score-subtitle {
      color: var(--text-muted);
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .results-stats-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .res-stat {
      text-align: center;
    }

    .res-stat .val {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .res-stat .lbl {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .results-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    /* QUESTION BANK VIEW */
    .bank-header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .search-bar-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 280px;
      padding: 0.65rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-main);
      font-size: 0.95rem;
    }

    .search-input:focus {
      outline: 2px solid var(--primary);
    }

    .filter-select {
      padding: 0.65rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-main);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }

    .bank-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .bank-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.5rem;
      box-shadow: var(--shadow-sm);
    }

    .bank-item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }

    .bank-q-text {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .bank-options {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .bank-opt {
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--bg-card-subtle);
    }

    .bank-opt.correct {
      background: var(--sn-green-light);
      color: var(--sn-green-dark);
      font-weight: 600;
    }

    /* KEYBOARD HINT PILL */
    .kbd-hint {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.15rem 0.45rem;
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    /* TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--text-main);
      color: var(--bg-card);
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 100;
      display: none;
      animation: slideInUp 0.2s ease;
    }

    @keyframes slideInUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* MODAL */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 99;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-box {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      max-width: 480px;
      width: 100%;
      box-shadow: var(--shadow-lg);
    }

    .modal-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .modal-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .modal-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    /* RESPONSIVE */
    @media (max-width: 640px) {
      .header-inner {
        flex-wrap: wrap;
      }
      .nav-tabs {
        order: 3;
        width: 100%;
        justify-content: center;
        margin-top: 0.5rem;
      }
      .hero-banner {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="header-inner">
      <div class="brand" onclick="app.showView('dashboard')">
        <div class="brand-logo">CSA</div>
        <div class="brand-text">
          <h1>ServiceNow CSA <span class="badge">Certified</span></h1>
          <p>280 Real Mock Exam Questions & Practice Simulator</p>
        </div>
      </div>

      <nav class="nav-tabs">
        <button class="nav-tab active" data-view="dashboard" onclick="app.showView('dashboard')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </button>
        <button class="nav-tab" data-view="bank" onclick="app.showView('bank')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Question Bank (280)
        </button>
      </nav>

      <div class="header-actions">
        <button class="icon-btn" id="themeToggle" title="Toggle Theme" onclick="app.toggleTheme()">
          <svg id="themeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
        <button class="icon-btn" title="Reset Progress" onclick="app.confirmReset()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- MAIN -->
  <main>

    <!-- DASHBOARD VIEW -->
    <div id="view-dashboard" class="view-section active">
      <div class="hero-banner">
        <div class="hero-content">
          <h2>Master Your ServiceNow CSA Certification</h2>
          <p>Study efficiently with 280 authentic questions from both the 200-item and 80-item reviewer sets. Choose instant feedback or timed real exam simulation.</p>
        </div>
        <div>
          <button class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.95rem;" onclick="app.startExam(60, 'full-exam', 'Real CSA Exam (60 Qs)')">
            ⚡ Start 60-Q Practice Exam
          </button>
        </div>
      </div>

      <!-- STATS STRIP -->
      <div class="stats-strip">
        <div class="stat-card">
          <div class="stat-icon" style="background: var(--primary-light); color: var(--primary);">📝</div>
          <div class="stat-info">
            <h3 id="statTotalAnswered">0</h3>
            <p>Questions Answered</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: var(--sn-green-light); color: var(--sn-green-dark);">🎯</div>
          <div class="stat-info">
            <h3 id="statAccuracy">0%</h3>
            <p>Overall Accuracy</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: var(--warning-light); color: var(--warning);">⭐</div>
          <div class="stat-info">
            <h3 id="statStarred">0</h3>
            <p>Starred For Review</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: var(--danger-light); color: var(--danger);">⚠️</div>
          <div class="stat-info">
            <h3 id="statMissed">0</h3>
            <p>Mistakes Bank</p>
          </div>
        </div>
      </div>

      <!-- PRACTICE MODES -->
      <h2 class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        Study & Practice Modes
      </h2>
      <div class="modes-grid">
        <!-- MODE: REAL EXAM SIMULATOR -->
        <div class="mode-card" onclick="app.startExam(60, 'exam-sim', 'Timed CSA Exam (60 Qs)')">
          <div>
            <span class="mode-badge primary">⏱️ Exam Simulation</span>
            <h3>Timed Exam Simulator</h3>
            <p>60 questions randomized from all 280 items, 90 minutes timer, passing threshold 70%. Simulates the real ServiceNow CSA exam format.</p>
          </div>
          <div class="mode-footer">
            <span>60 Questions · 90 Mins</span>
            <span class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Launch</span>
          </div>
        </div>

        <!-- MODE: QUICK 20 DRILL -->
        <div class="mode-card" onclick="app.startStudy(20, 'random', 'Quick 20 Workout')">
          <div>
            <span class="mode-badge success">⚡ Quick Study</span>
            <h3>Quick 20 Drill</h3>
            <p>20 random questions with instant answers and explanations. Perfect for a fast 10-minute high-yield practice session.</p>
          </div>
          <div class="mode-footer">
            <span>20 Questions · Instant Feedback</span>
            <span class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Start Drill</span>
          </div>
        </div>

        <!-- MODE: 200-ITEM COMPREHENSIVE -->
        <div class="mode-card" onclick="app.startStudy(200, '200-items', '200-Item Full Reviewer')">
          <div>
            <span class="mode-badge primary">📚 Deep Dive</span>
            <h3>200-Item Reviewer</h3>
            <p>Work through the complete 200-question CSA mock exam set at your own pace with step-by-step verification.</p>
          </div>
          <div class="mode-footer">
            <span>200 Questions · Complete Set</span>
            <span class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Practice Set</span>
          </div>
        </div>

        <!-- MODE: 80-ITEM CORE -->
        <div class="mode-card" onclick="app.startStudy(80, '80-items', '80-Item Core Reviewer')">
          <div>
            <span class="mode-badge primary">🎯 High Yield</span>
            <h3>80-Item Core Reviewer</h3>
            <p>The specialized 80-question mock exam focusing heavily on platform fundamentals, ACLs, and Flow Designer.</p>
          </div>
          <div class="mode-footer">
            <span>80 Questions · Core Set</span>
            <span class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Practice Set</span>
          </div>
        </div>

        <!-- MODE: MISTAKES DRILL -->
        <div class="mode-card" onclick="app.startMistakesPractice()">
          <div>
            <span class="mode-badge danger">⚠️ Targeted Repair</span>
            <h3>Weak-Spot Mistakes Bank</h3>
            <p>Target only the questions you have answered incorrectly in previous study sessions until you achieve 100% mastery.</p>
          </div>
          <div class="mode-footer">
            <span id="mistakesCountLabel">0 Questions in Bank</span>
            <span class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Review Missed</span>
          </div>
        </div>

        <!-- MODE: STARRED ITEMS -->
        <div class="mode-card" onclick="app.startStarredPractice()">
          <div>
            <span class="mode-badge warning">⭐ Bookmarked</span>
            <h3>Starred Questions</h3>
            <p>Revisit all questions you explicitly marked for later review and reinforcement before taking the real exam.</p>
          </div>
          <div class="mode-footer">
            <span id="starredCountLabel">0 Bookmarked Questions</span>
            <span class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Review Starred</span>
          </div>
        </div>
      </div>

      <!-- TOPIC BREAKDOWN -->
      <div class="topics-section">
        <h2 class="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          Study by CSA Domain Topics
        </h2>
        <div class="topics-grid" id="topicsGrid">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>

    <!-- SESSION VIEW (STUDY & EXAM) -->
    <div id="view-session" class="view-section">
      <div class="session-header">
        <div class="session-meta">
          <button class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="app.confirmExitSession()">
            ✕ Exit
          </button>
          <span id="sessionTitleBadge" class="mode-badge primary" style="margin: 0;">Study Mode</span>
          <span id="questionCounterText" style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">
            Q 1 of 60
          </span>
        </div>

        <div class="progress-bar-container">
          <div id="sessionProgressBar" class="progress-bar-fill"></div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div id="examTimer" class="timer-display" style="display: none;">
            ⏱️ <span id="timerText">90:00</span>
          </div>
          <button id="starBtn" class="icon-btn" title="Star this question" onclick="app.toggleCurrentStar()">
            <svg id="starIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </button>
        </div>
      </div>

      <div class="session-body">
        <!-- QUESTION MAIN -->
        <div class="question-card">
          <div class="q-top-row">
            <div class="q-tags" id="qTagsContainer">
              <!-- tags -->
            </div>
            <div id="qTypeHint" class="q-type-badge">Single Choice</div>
          </div>

          <div class="question-text" id="qText">
            <!-- Question text -->
          </div>

          <div class="options-list" id="qOptionsContainer">
            <!-- Options rendered here -->
          </div>

          <!-- FEEDBACK BOX (STUDY MODE) -->
          <div id="feedbackBox" class="feedback-box">
            <div id="feedbackTitle" class="feedback-title">✓ Correct!</div>
            <div id="feedbackExp" class="feedback-explanation">Explanation and answer details.</div>
          </div>

          <!-- CONTROLS -->
          <div class="q-controls">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button class="btn btn-outline" id="prevBtn" onclick="app.prevQuestion()">
                ← Prev
              </button>
              <button class="btn btn-outline" id="nextBtn" onclick="app.nextQuestion()">
                Next →
              </button>
              <span class="kbd-hint" title="Use Arrow keys or A-F / 1-6 keys">⌨️ A-F, Arrows</span>
            </div>

            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button class="btn btn-secondary" id="checkBtn" onclick="app.checkAnswer()">
                Check Answer
              </button>
              <button class="btn btn-primary" id="finishExamBtn" style="display: none;" onclick="app.confirmFinishExam()">
                Finish Exam
              </button>
            </div>
          </div>

          <!-- PERSONAL NOTES ACCORDION -->
          <div class="notes-box">
            <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.35rem;">
              Personal Study Note (Auto-saved)
            </label>
            <textarea id="questionNoteInput" class="notes-textarea" placeholder="Add your notes, mnemonics, or key points for this question..." oninput="app.saveCurrentNote()"></textarea>
          </div>
        </div>

        <!-- PALETTE SIDEBAR -->
        <div class="palette-card">
          <div class="palette-title">
            <span>Questions Overview</span>
            <span id="paletteCount" style="font-size: 0.75rem; color: var(--text-muted);">0 / 60</span>
          </div>

          <div class="palette-grid" id="paletteGrid">
            <!-- Palette buttons -->
          </div>

          <div class="palette-legend">
            <div class="legend-item"><div class="legend-dot" style="background: var(--primary);"></div> Answered</div>
            <div class="legend-item"><div class="legend-dot" style="background: var(--bg-card-subtle); border: 1px solid var(--border-color);"></div> Pending</div>
            <div class="legend-item"><div class="legend-dot" style="background: var(--sn-green);"></div> Correct</div>
            <div class="legend-item"><div class="legend-dot" style="background: var(--danger);"></div> Wrong</div>
          </div>
        </div>
      </div>
    </div>

    <!-- RESULTS VIEW -->
    <div id="view-results" class="view-section">
      <div class="results-card">
        <div id="resultsBadge" class="results-badge pass">Passed</div>
        <div class="score-big" id="resultsScore">85%</div>
        <div class="score-subtitle" id="resultsSub">51 of 60 questions correct (Passing grade is 70%)</div>

        <div class="results-stats-row">
          <div class="res-stat">
            <div class="val" id="resTime">18:42</div>
            <div class="lbl">Time Taken</div>
          </div>
          <div class="res-stat">
            <div class="val" id="resCorrect" style="color: var(--sn-green);">51</div>
            <div class="lbl">Correct</div>
          </div>
          <div class="res-stat">
            <div class="val" id="resWrong" style="color: var(--danger);">9</div>
            <div class="lbl">Incorrect</div>
          </div>
          <div class="res-stat">
            <div class="val" id="resUnanswered">0</div>
            <div class="lbl">Unanswered</div>
          </div>
        </div>

        <div class="results-actions">
          <button class="btn btn-primary" onclick="app.reviewResults('all')">
            Review All Questions
          </button>
          <button class="btn btn-secondary" id="reviewWrongBtn" onclick="app.reviewResults('wrong')">
            Review Mistakes Only
          </button>
          <button class="btn btn-outline" onclick="app.showView('dashboard')">
            Back to Dashboard
          </button>
        </div>
      </div>

      <!-- DETAILED REVIEW ACCORDION / LIST -->
      <div id="resultsDetailContainer" style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Filled on review -->
      </div>
    </div>

    <!-- QUESTION BANK VIEW -->
    <div id="view-bank" class="view-section">
      <div class="bank-header">
        <div>
          <h2 class="section-title" style="margin-bottom: 0.25rem;">Full Question Bank Explorer</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Browse, search, and inspect all 280 ServiceNow CSA exam questions with instant answers and filters.</p>
        </div>

        <div class="search-bar-row">
          <input type="text" id="bankSearchInput" class="search-input" placeholder="Search keywords (e.g., CMDB, Flow Designer, ACL, Transform Map, Business Rule)..." oninput="app.filterBank()">
          <select id="bankSourceFilter" class="filter-select" onchange="app.filterBank()">
            <option value="all">All Sources (280)</option>
            <option value="200-item">200-Item Exam (200)</option>
            <option value="80-item">80-Item Exam (80)</option>
          </select>
          <select id="bankTopicFilter" class="filter-select" onchange="app.filterBank()">
            <option value="all">All Topics</option>
            <!-- Populated -->
          </select>
          <select id="bankStatusFilter" class="filter-select" onchange="app.filterBank()">
            <option value="all">All Status</option>
            <option value="starred">Starred Only</option>
            <option value="mistakes">Mistakes Bank Only</option>
          </select>
        </div>
      </div>

      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;" id="bankResultsCount">
        Showing 280 questions
      </div>

      <div class="bank-list" id="bankList">
        <!-- Rendered items -->
      </div>
    </div>

  </main>

  <!-- CONFIRM EXIT MODAL -->
  <div class="modal-overlay" id="confirmModal">
    <div class="modal-box">
      <h3 class="modal-title" id="modalTitle">Leave Session?</h3>
      <p class="modal-desc" id="modalDesc">Your current exam progress will be recorded. Are you sure you want to exit?</p>
      <div class="modal-actions">
        <button class="btn btn-outline" onclick="app.closeModal()">Cancel</button>
        <button class="btn btn-primary" id="modalConfirmBtn" onclick="app.handleModalConfirm()">Confirm</button>
      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div id="toast" class="toast">Notification message</div>

  <!-- EMBEDDED QUESTION DATA -->
  <script>
    const RAW_QUESTIONS = ${questionsJSON};
  </script>

  <!-- APPLICATION LOGIC -->
  <script>
    class CSAExamApp {
      constructor() {
        this.questions = RAW_QUESTIONS;
        this.storageKey = 'csa_mock_exam_state_v1';
        this.state = this.loadState();
        
        this.currentSession = null;
        this.currentQIndex = 0;
        this.timerInterval = null;
        this.timeRemaining = 0; // seconds for exam
        this.timeElapsed = 0; // for study
        
        this.init();
      }

      loadState() {
        const defaultState = {
          theme: 'light',
          history: {}, // questionId: { timesAnswered: 0, correct: 0, lastResult: true/false }
          starred: {}, // questionId: true
          notes: {}, // questionId: "note text"
          topicProgress: {},
          completedExams: []
        };
        try {
          const saved = localStorage.getItem(this.storageKey);
          return saved ? Object.assign(defaultState, JSON.parse(saved)) : defaultState;
        } catch(e) {
          return defaultState;
        }
      }

      saveState() {
        try {
          const session = this.currentSession;
          if (session?.topic) {
            this.state.topicProgress[session.topic] = {
              currentQIndex: this.currentQIndex,
              userAnswers: session.userAnswers,
              checked: session.checked
            };
          }
          localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch(e) {
          console.error('Storage error:', e);
        }
      }

      init() {
        // Theme setup
        document.documentElement.setAttribute('data-theme', this.state.theme);
        this.updateThemeIcon();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Render Dashboard
        this.renderDashboard();
        this.populateBankFilters();

        console.log('CSA Exam Hub initialized with', this.questions.length, 'questions.');
      }

      toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.state.theme);
        this.updateThemeIcon();
        this.saveState();
      }

      updateThemeIcon() {
        const icon = document.getElementById('themeIcon');
        if (this.state.theme === 'dark') {
          icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else {
          icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
      }

      showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2400);
      }

      showView(viewName) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));

        const target = document.getElementById('view-' + viewName);
        if (target) target.classList.add('active');

        const activeTab = document.querySelector(\`.nav-tab[data-view="\${viewName}"]\`);
        if (activeTab) activeTab.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (viewName === 'dashboard') {
          this.renderDashboard();
        } else if (viewName === 'bank') {
          this.renderBankList();
        }
      }

      renderDashboard() {
        const answeredIds = Object.keys(this.state.history);
        const totalAnswered = answeredIds.length;
        let totalCorrect = 0;
        let missedCount = 0;

        answeredIds.forEach(id => {
          const h = this.state.history[id];
          if (h && h.correct > 0) totalCorrect++;
          if (h && h.lastResult === false) missedCount++;
        });

        const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        const starredCount = Object.keys(this.state.starred).filter(k => this.state.starred[k]).length;

        document.getElementById('statTotalAnswered').textContent = totalAnswered;
        document.getElementById('statAccuracy').textContent = accuracy + '%';
        document.getElementById('statStarred').textContent = starredCount;
        document.getElementById('statMissed').textContent = missedCount;

        document.getElementById('mistakesCountLabel').textContent = missedCount + ' Questions in Bank';
        document.getElementById('starredCountLabel').textContent = starredCount + ' Bookmarked Questions';

        // Render Topics breakdown
        const topicCounts = {};
        this.questions.forEach(q => {
          q.tags.forEach(t => {
            topicCounts[t] = (topicCounts[t] || 0) + 1;
          });
        });

        const topicsGrid = document.getElementById('topicsGrid');
        topicsGrid.innerHTML = '';
        Object.keys(topicCounts).sort().forEach(tag => {
          const progress = this.state.topicProgress[tag];
          const checkedCount = progress
            ? Object.values(progress.checked).filter(Boolean).length
            : 0;
          const item = document.createElement('div');
          item.className = 'topic-item';
          item.innerHTML = \`
            <span class="topic-name">\${tag}</span>
            <span class="topic-count">\${checkedCount === topicCounts[tag] ? 'Completed' : \`\${checkedCount}/\${topicCounts[tag]} studied\`}</span>
          \`;
          item.onclick = () => this.startTopicPractice(tag);
          topicsGrid.appendChild(item);
        });
      }

      /* SESSION START HELPERS */
      startStudy(count, filterMode, title) {
        let pool = [...this.questions];

        if (filterMode === '200-items') {
          pool = pool.filter(q => q.source.includes('200'));
        } else if (filterMode === '80-items') {
          pool = pool.filter(q => q.source.includes('80'));
        } else if (filterMode === 'random') {
          pool = this.shuffleArray(pool);
        }

        const selected = pool.slice(0, count);
        this.initSession(selected, 'study', title);
      }

      startTopicPractice(topic) {
        const pool = this.questions.filter(q => q.tags.includes(topic));
        this.initSession(pool, 'study', \`Topic: \${topic} (\${pool.length} Qs)\`, 0, topic);
      }

      startMistakesPractice() {
        const missedIds = Object.keys(this.state.history).filter(id => this.state.history[id]?.lastResult === false);
        if (missedIds.length === 0) {
          alert('Great job! You have no questions in your Mistakes Bank. Practice more questions to track weak spots.');
          return;
        }
        const pool = this.questions.filter(q => missedIds.includes(String(q.id)) || missedIds.includes(String(q.globalId)));
        this.initSession(pool, 'study', \`Mistakes Bank Drill (\${pool.length} Qs)\`);
      }

      startStarredPractice() {
        const starredIds = Object.keys(this.state.starred).filter(id => this.state.starred[id]);
        if (starredIds.length === 0) {
          alert('You have no starred questions yet. Click the star icon ⭐ on any question to bookmark it.');
          return;
        }
        const pool = this.questions.filter(q => starredIds.includes(String(q.id)) || starredIds.includes(String(q.globalId)));
        this.initSession(pool, 'study', \`Starred Questions Review (\${pool.length} Qs)\`);
      }

      startExam(count = 60, type = 'exam-sim', title = 'Timed CSA Exam') {
        const pool = this.shuffleArray([...this.questions]).slice(0, count);
        this.initSession(pool, 'exam', title, 90 * 60); // 90 mins
      }

      initSession(questionList, mode, title, durationSeconds = 0, topic = null) {
        if (!questionList || questionList.length === 0) {
          alert('No questions match this criteria.');
          return;
        }

        const savedProgress = topic ? this.state.topicProgress[topic] : null;
        this.currentSession = {
          mode: mode, // 'study' or 'exam'
          title: title,
          questions: questionList,
          topic,
          userAnswers: savedProgress?.userAnswers || {}, // index: [selected letters]
          checked: savedProgress?.checked || {}, // index: boolean (in study mode)
          startTime: Date.now(),
          duration: durationSeconds,
          flagged: {} // index: boolean
        };

        this.currentQIndex = savedProgress
          ? Math.min(Math.max(savedProgress.currentQIndex || 0, 0), questionList.length - 1)
          : 0;

        // UI setup
        document.getElementById('sessionTitleBadge').textContent = mode === 'exam' ? 'Exam Simulator' : 'Study Mode';
        document.getElementById('sessionTitleBadge').className = mode === 'exam' ? 'mode-badge danger' : 'mode-badge primary';

        const timerEl = document.getElementById('examTimer');
        if (mode === 'exam') {
          timerEl.style.display = 'flex';
          this.timeRemaining = durationSeconds;
          this.startTimer();
          document.getElementById('checkBtn').style.display = 'none';
          document.getElementById('finishExamBtn').style.display = 'inline-flex';
        } else {
          timerEl.style.display = 'none';
          clearInterval(this.timerInterval);
          document.getElementById('checkBtn').style.display = 'inline-flex';
          document.getElementById('finishExamBtn').style.display = 'none';
        }

        this.showView('session');
        this.renderCurrentQuestion();
        this.renderPalette();
      }

      startTimer() {
        clearInterval(this.timerInterval);
        const timerText = document.getElementById('timerText');
        const timerEl = document.getElementById('examTimer');

        const updateDisplay = () => {
          const mins = Math.floor(this.timeRemaining / 60);
          const secs = this.timeRemaining % 60;
          timerText.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;

          if (this.timeRemaining <= 300) { // last 5 mins
            timerEl.classList.add('low-time');
          } else {
            timerEl.classList.remove('low-time');
          }

          if (this.timeRemaining <= 0) {
            clearInterval(this.timerInterval);
            alert('Time is up! Submitting your exam now.');
            this.finishExam();
          }
          this.timeRemaining--;
        };

        updateDisplay();
        this.timerInterval = setInterval(updateDisplay, 1000);
      }

      renderCurrentQuestion() {
        const s = this.currentSession;
        if (!s) return;

        const q = s.questions[this.currentQIndex];
        const total = s.questions.length;

        // Counters & Progress
        document.getElementById('questionCounterText').textContent = \`Question \${this.currentQIndex + 1} of \${total}\`;
        const pct = Math.round(((this.currentQIndex + 1) / total) * 100);
        document.getElementById('sessionProgressBar').style.width = pct + '%';

        // Star button state
        const isStarred = !!this.state.starred[q.globalId || q.id];
        const starBtn = document.getElementById('starBtn');
        const starIcon = document.getElementById('starIcon');
        if (isStarred) {
          starIcon.setAttribute('fill', 'var(--warning)');
          starIcon.setAttribute('stroke', 'var(--warning)');
        } else {
          starIcon.setAttribute('fill', 'none');
          starIcon.setAttribute('stroke', 'currentColor');
        }

        // Tags & Hints
        const tagsContainer = document.getElementById('qTagsContainer');
        tagsContainer.innerHTML = '';
        (q.tags || ['ServiceNow']).forEach(t => {
          const span = document.createElement('span');
          span.className = 'tag-badge';
          span.textContent = t;
          tagsContainer.appendChild(span);
        });

        // Source badge
        const srcBadge = document.createElement('span');
        srcBadge.className = 'tag-badge';
        srcBadge.style.color = 'var(--primary)';
        srcBadge.textContent = q.source;
        tagsContainer.appendChild(srcBadge);

        // Multiple selection hint
        const typeHint = document.getElementById('qTypeHint');
        const correctCount = q.options.filter(o => o.isCorrect).length;
        if (q.isMultiple || correctCount > 1) {
          typeHint.textContent = \`Multiple Choice (Choose \${correctCount})\`;
          typeHint.className = 'q-type-badge';
        } else {
          typeHint.textContent = 'Single Choice (Choose 1)';
          typeHint.className = 'q-type-badge';
        }

        // Question text
        document.getElementById('qText').textContent = q.question;

        // Options
        const container = document.getElementById('qOptionsContainer');
        container.innerHTML = '';

        const userSelected = s.userAnswers[this.currentQIndex] || [];
        const isChecked = s.checked[this.currentQIndex];

        q.options.forEach((opt, idx) => {
          const optEl = document.createElement('div');
          optEl.className = 'option-item';
          const isSelected = userSelected.includes(opt.label);

          if (isSelected) optEl.classList.add('selected');

          // If checked in study mode, highlight right & wrong
          if (isChecked && s.mode === 'study') {
            optEl.classList.add('locked');
            if (opt.isCorrect) {
              optEl.classList.add('correct');
            } else if (isSelected && !opt.isCorrect) {
              optEl.classList.add('incorrect');
            }
          }

          optEl.innerHTML = \`
            <div class="opt-letter">\${opt.label}</div>
            <div class="opt-text">\${this.escapeHtml(opt.text)}</div>
            <div class="opt-status-icon">\${opt.isCorrect ? '✓' : '✕'}</div>
          \`;

          optEl.onclick = () => {
            if (isChecked && s.mode === 'study') return;
            this.handleOptionClick(opt.label, q);
          };

          container.appendChild(optEl);
        });

        // Feedback box
        const feedbackBox = document.getElementById('feedbackBox');
        if (isChecked && s.mode === 'study') {
          feedbackBox.classList.add('active');
          const isAllCorrect = this.isQuestionAnswerCorrect(q, userSelected);
          if (isAllCorrect) {
            feedbackBox.className = 'feedback-box active correct';
            document.getElementById('feedbackTitle').innerHTML = '✓ Correct Answer!';
          } else {
            feedbackBox.className = 'feedback-box active incorrect';
            document.getElementById('feedbackTitle').innerHTML = '✕ Incorrect';
          }

          const correctLabels = q.options.filter(o => o.isCorrect).map(o => o.label).join(', ');
          document.getElementById('feedbackExp').innerHTML = \`
            <strong>Correct Option(s): \${correctLabels}</strong><br>
            Make sure to review the official ServiceNow documentation and best practices associated with this topic.
          \`;
        } else {
          feedbackBox.classList.remove('active');
        }

        // Buttons state
        document.getElementById('prevBtn').disabled = this.currentQIndex === 0;
        document.getElementById('nextBtn').disabled = this.currentQIndex === total - 1;

        // Note
        const note = this.state.notes[q.globalId || q.id] || '';
        document.getElementById('questionNoteInput').value = note;

        this.updatePaletteButton(this.currentQIndex);
      }

      handleOptionClick(letter, question) {
        const s = this.currentSession;
        if (!s) return;

        let currentSelected = s.userAnswers[this.currentQIndex] || [];
        const correctCount = question.options.filter(o => o.isCorrect).length;

        if (question.isMultiple || correctCount > 1) {
          // Toggle choice
          if (currentSelected.includes(letter)) {
            currentSelected = currentSelected.filter(l => l !== letter);
          } else {
            currentSelected.push(letter);
          }
        } else {
          // Single choice
          currentSelected = [letter];
        }

        s.userAnswers[this.currentQIndex] = currentSelected;
        this.saveState();
        this.renderCurrentQuestion();
        this.updatePaletteButton(this.currentQIndex);
      }

      checkAnswer() {
        const s = this.currentSession;
        if (!s) return;

        const q = s.questions[this.currentQIndex];
        const userSelected = s.userAnswers[this.currentQIndex] || [];

        if (userSelected.length === 0) {
          this.showToast('Please select an option before checking.');
          return;
        }

        s.checked[this.currentQIndex] = true;
        const isCorrect = this.isQuestionAnswerCorrect(q, userSelected);

        // Record history
        const qId = q.globalId || q.id;
        if (!this.state.history[qId]) {
          this.state.history[qId] = { timesAnswered: 0, correct: 0, lastResult: true };
        }
        this.state.history[qId].timesAnswered++;
        if (isCorrect) this.state.history[qId].correct++;
        this.state.history[qId].lastResult = isCorrect;
        this.saveState();

        this.renderCurrentQuestion();
        this.updatePaletteButton(this.currentQIndex);
      }

      isQuestionAnswerCorrect(question, userLabels) {
        const correctLabels = question.options.filter(o => o.isCorrect).map(o => o.label).sort();
        const userSorted = [...userLabels].sort();
        if (correctLabels.length !== userSorted.length) return false;
        return correctLabels.every((val, idx) => val === userSorted[idx]);
      }

      prevQuestion() {
        if (this.currentQIndex > 0) {
          this.currentQIndex--;
          this.saveState();
          this.renderCurrentQuestion();
        }
      }

      nextQuestion() {
        if (this.currentSession && this.currentQIndex < this.currentSession.questions.length - 1) {
          this.currentQIndex++;
          this.saveState();
          this.renderCurrentQuestion();
        }
      }

      jumpToQuestion(index) {
        if (this.currentSession && index >= 0 && index < this.currentSession.questions.length) {
          this.currentQIndex = index;
          this.saveState();
          this.renderCurrentQuestion();
        }
      }

      renderPalette() {
        const s = this.currentSession;
        if (!s) return;

        const grid = document.getElementById('paletteGrid');
        grid.innerHTML = '';
        document.getElementById('paletteCount').textContent = \`\${s.questions.length} Questions\`;

        s.questions.forEach((q, idx) => {
          const btn = document.createElement('button');
          btn.id = 'pal-btn-' + idx;
          btn.className = 'pal-btn';
          btn.textContent = idx + 1;
          btn.onclick = () => this.jumpToQuestion(idx);
          grid.appendChild(btn);
        });

        this.updatePaletteButton(this.currentQIndex);
      }

      updatePaletteButton(idx) {
        const s = this.currentSession;
        if (!s) return;

        s.questions.forEach((q, i) => {
          const btn = document.getElementById('pal-btn-' + i);
          if (!btn) return;

          btn.className = 'pal-btn';
          if (i === this.currentQIndex) btn.classList.add('current');

          const userAns = s.userAnswers[i] || [];
          if (userAns.length > 0) {
            btn.classList.add('answered');
          }

          if (s.mode === 'study' && s.checked[i]) {
            const isCorrect = this.isQuestionAnswerCorrect(q, userAns);
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
          }

          if (s.flagged && s.flagged[i]) {
            btn.classList.add('flagged');
          }
        });
      }

      toggleCurrentStar() {
        const s = this.currentSession;
        if (!s) return;
        const q = s.questions[this.currentQIndex];
        const qId = q.globalId || q.id;

        this.state.starred[qId] = !this.state.starred[qId];
        this.saveState();
        this.renderCurrentQuestion();
        this.showToast(this.state.starred[qId] ? '⭐ Question bookmarked' : 'Removed from bookmarks');
      }

      saveCurrentNote() {
        const s = this.currentSession;
        if (!s) return;
        const q = s.questions[this.currentQIndex];
        const qId = q.globalId || q.id;
        const text = document.getElementById('questionNoteInput').value;
        this.state.notes[qId] = text;
        this.saveState();
      }

      confirmExitSession() {
        const s = this.currentSession;
        if (!s) return this.showView('dashboard');

        if (s.mode === 'exam') {
          this.openModal(
            'Leave Exam?',
            'Your current exam is in progress. Leaving will calculate your score based on answered questions.',
            () => this.finishExam()
          );
        } else {
          this.showView('dashboard');
        }
      }

      confirmFinishExam() {
        const s = this.currentSession;
        if (!s) return;

        const total = s.questions.length;
        const answered = Object.keys(s.userAnswers).length;
        const unanswered = total - answered;

        let msg = \`You have answered \${answered} of \${total} questions.\`;
        if (unanswered > 0) {
          msg += \` There are \${unanswered} unanswered questions remaining.\`;
        }
        msg += ' Are you ready to submit your exam for grading?';

        this.openModal('Submit Exam?', msg, () => this.finishExam());
      }

      finishExam() {
        clearInterval(this.timerInterval);
        const s = this.currentSession;
        if (!s) return;

        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;

        s.questions.forEach((q, idx) => {
          const userAns = s.userAnswers[idx] || [];
          const qId = q.globalId || q.id;

          if (userAns.length === 0) {
            unanswered++;
            if (!this.state.history[qId]) this.state.history[qId] = { timesAnswered: 0, correct: 0, lastResult: false };
            this.state.history[qId].timesAnswered++;
            this.state.history[qId].lastResult = false;
          } else {
            const isRight = this.isQuestionAnswerCorrect(q, userAns);
            if (isRight) {
              correct++;
            } else {
              incorrect++;
            }
            if (!this.state.history[qId]) this.state.history[qId] = { timesAnswered: 0, correct: 0, lastResult: true };
            this.state.history[qId].timesAnswered++;
            if (isRight) this.state.history[qId].correct++;
            this.state.history[qId].lastResult = isRight;
          }
        });

        this.saveState();

        const total = s.questions.length;
        const pct = Math.round((correct / total) * 100);
        const passed = pct >= 70;

        const elapsedSecs = s.duration ? (s.duration - Math.max(0, this.timeRemaining)) : Math.round((Date.now() - s.startTime) / 1000);
        const elapsedMins = Math.floor(elapsedSecs / 60);
        const elapsedRemainSecs = elapsedSecs % 60;
        const timeStr = \`\${elapsedMins}m \${elapsedRemainSecs}s\`;

        // Fill Results View
        const badge = document.getElementById('resultsBadge');
        badge.className = \`results-badge \${passed ? 'pass' : 'fail'}\`;
        badge.textContent = passed ? '🎉 Exam Passed' : '❌ Needs Improvement (Failed)';

        document.getElementById('resultsScore').textContent = pct + '%';
        document.getElementById('resultsSub').textContent = \`\${correct} of \${total} correct · Required: 70% to Pass\`;

        document.getElementById('resTime').textContent = timeStr;
        document.getElementById('resCorrect').textContent = correct;
        document.getElementById('resWrong').textContent = incorrect;
        document.getElementById('resUnanswered').textContent = unanswered;

        this.showView('results');
        this.reviewResults('all');
      }

      reviewResults(filter) {
        const s = this.currentSession;
        if (!s) return;

        const container = document.getElementById('resultsDetailContainer');
        container.innerHTML = '';

        s.questions.forEach((q, idx) => {
          const userAns = s.userAnswers[idx] || [];
          const isRight = this.isQuestionAnswerCorrect(q, userAns);

          if (filter === 'wrong' && isRight) return;

          const card = document.createElement('div');
          card.className = 'bank-item';
          card.style.borderLeft = isRight ? '4px solid var(--sn-green)' : '4px solid var(--danger)';

          let optsHtml = '';
          q.options.forEach(opt => {
            const isUserChosen = userAns.includes(opt.label);
            let optClass = 'bank-opt';
            let mark = '';
            if (opt.isCorrect) {
              optClass += ' correct';
              mark = ' ✓ (Correct Answer)';
            }
            if (isUserChosen && !opt.isCorrect) {
              optClass += ' incorrect';
              opt.style = 'background: var(--danger-light); color: var(--danger);';
              mark = ' ✕ (Your Answer)';
            } else if (isUserChosen && opt.isCorrect) {
              mark = ' ✓ (Your Answer - Correct)';
            }

            optsHtml += \`
              <div class="\${optClass}">
                <strong>[\${opt.label}]</strong> \${this.escapeHtml(opt.text)} \${mark}
              </div>
            \`;
          });

          card.innerHTML = \`
            <div class="bank-item-header">
              <span class="mode-badge \${isRight ? 'success' : 'danger'}">\${isRight ? 'Correct' : 'Incorrect'}</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Q\${idx + 1} of \${s.questions.length} · \${q.source}</span>
            </div>
            <div class="bank-q-text">\${q.question}</div>
            <div class="bank-options">\${optsHtml}</div>
          \`;

          container.appendChild(card);
        });

        window.scrollTo({ top: document.querySelector('.results-card').offsetTop + 300, behavior: 'smooth' });
      }

      /* QUESTION BANK METHODS */
      populateBankFilters() {
        const topics = new Set();
        this.questions.forEach(q => q.tags.forEach(t => topics.add(t)));
        const sel = document.getElementById('bankTopicFilter');
        Array.from(topics).sort().forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          sel.appendChild(opt);
        });
      }

      filterBank() {
        const query = document.getElementById('bankSearchInput').value.toLowerCase().trim();
        const source = document.getElementById('bankSourceFilter').value;
        const topic = document.getElementById('bankTopicFilter').value;
        const status = document.getElementById('bankStatusFilter').value;

        const filtered = this.questions.filter(q => {
          // Source filter
          if (source === '200-item' && !q.source.includes('200')) return false;
          if (source === '80-item' && !q.source.includes('80')) return false;

          // Topic filter
          if (topic !== 'all' && !q.tags.includes(topic)) return false;

          // Status filter
          const qId = q.globalId || q.id;
          if (status === 'starred' && !this.state.starred[qId]) return false;
          if (status === 'mistakes' && this.state.history[qId]?.lastResult !== false) return false;

          // Query filter
          if (query) {
            const inQ = q.question.toLowerCase().includes(query);
            const inOpts = q.options.some(o => o.text.toLowerCase().includes(query));
            if (!inQ && !inOpts) return false;
          }

          return true;
        });

        document.getElementById('bankResultsCount').textContent = \`Showing \${filtered.length} of 280 questions\`;
        this.renderBankList(filtered);
      }

      renderBankList(items = null) {
        const list = items || this.questions;
        const container = document.getElementById('bankList');
        container.innerHTML = '';

        if (list.length === 0) {
          container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--text-muted);">No questions match your filter criteria.</div>';
          return;
        }

        // Render first 80 for speed, paginate or render smoothly
        list.slice(0, 100).forEach(q => {
          const qId = q.globalId || q.id;
          const isStarred = !!this.state.starred[qId];

          const item = document.createElement('div');
          item.className = 'bank-item';

          let optsHtml = '';
          q.options.forEach(opt => {
            optsHtml += \`
              <div class="bank-opt \${opt.isCorrect ? 'correct' : ''}">
                <strong>[\${opt.label}]</strong> \${this.escapeHtml(opt.text)} \${opt.isCorrect ? ' ✓' : ''}
              </div>
            \`;
          });

          item.innerHTML = \`
            <div class="bank-item-header">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span class="tag-badge">#\${q.globalId}</span>
                <span class="tag-badge" style="color: var(--primary);">\${q.source}</span>
                \${q.tags.map(t => \`<span class="tag-badge">\${t}</span>\`).join('')}
              </div>
              <button class="icon-btn" style="width: 28px; height: 28px;" onclick="app.toggleBankStar(\${qId}, this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="\${isStarred ? 'var(--warning)' : 'none'}" stroke="\${isStarred ? 'var(--warning)' : 'currentColor'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </button>
            </div>
            <div class="bank-q-text">\${q.question}</div>
            <div class="bank-options">\${optsHtml}</div>
          \`;

          container.appendChild(item);
        });

        if (list.length > 100) {
          const more = document.createElement('div');
          more.style.textAlign = 'center';
          more.style.padding = '1.5rem';
          more.innerHTML = \`<span style="color: var(--text-muted); font-size: 0.9rem;">Showing top 100 results. Use the search bar above to narrow down specific topics.</span>\`;
          container.appendChild(more);
        }
      }

      toggleBankStar(qId, btn) {
        this.state.starred[qId] = !this.state.starred[qId];
        this.saveState();
        const svg = btn.querySelector('svg');
        if (this.state.starred[qId]) {
          svg.setAttribute('fill', 'var(--warning)');
          svg.setAttribute('stroke', 'var(--warning)');
        } else {
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
        }
        this.showToast(this.state.starred[qId] ? '⭐ Question bookmarked' : 'Bookmark removed');
      }

      /* KEYBOARD HANDLERS */
      handleKeyPress(e) {
        // Ignore if typing in note or search
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        const s = this.currentSession;
        if (!s) return;

        const q = s.questions[this.currentQIndex];
        if (!q) return;

        const key = e.key.toUpperCase();

        // Letters A, B, C, D, E, F, G
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        if (letters.includes(key)) {
          const opt = q.options.find(o => o.label === key);
          if (opt) {
            e.preventDefault();
            this.handleOptionClick(key, q);
          }
        }

        // Numbers 1-7
        const num = parseInt(e.key);
        if (num >= 1 && num <= q.options.length) {
          e.preventDefault();
          const opt = q.options[num - 1];
          if (opt) this.handleOptionClick(opt.label, q);
        }

        // Arrow keys
        if (e.key === 'ArrowRight' || e.key === 'n') {
          e.preventDefault();
          this.nextQuestion();
        } else if (e.key === 'ArrowLeft' || e.key === 'p') {
          e.preventDefault();
          this.prevQuestion();
        }

        // Enter or Space for Check Answer
        if (e.key === 'Enter') {
          e.preventDefault();
          if (s.mode === 'study') {
            this.checkAnswer();
          }
        }

        // B or F for Bookmark / Star
        if (e.key === 'b' || e.key === 'f') {
          e.preventDefault();
          this.toggleCurrentStar();
        }
      }

      /* MODALS */
      openModal(title, desc, confirmCallback) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        this.modalConfirmAction = confirmCallback;
        document.getElementById('confirmModal').classList.add('active');
      }

      closeModal() {
        document.getElementById('confirmModal').classList.remove('active');
        this.modalConfirmAction = null;
      }

      handleModalConfirm() {
        if (typeof this.modalConfirmAction === 'function') {
          this.modalConfirmAction();
        }
        this.closeModal();
      }

      confirmReset() {
        this.openModal(
          'Reset All Progress?',
          'This will clear your answer history, test stats, bookmarks, and notes. This cannot be undone.',
          () => {
            localStorage.removeItem(this.storageKey);
            this.state = this.loadState();
            this.renderDashboard();
            this.showToast('Progress reset successfully.');
          }
        );
      }

      /* UTILITIES */
      shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      }

      escapeHtml(str) {
        if (!str) return '';
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
    }

    // Launch App
    const app = new CSAExamApp();
  </script>
</body>
</html>
`;

fs.writeFileSync('e:/project/csa_mock_exam/index.html', html, 'utf8');
console.log('Successfully generated index.html! File size:', (html.length / 1024).toFixed(1), 'KB');
