#!/usr/bin/env node

// Helper script to toggle between original and refactored layout
// Usage: node toggle-layout.js [on|off|status]

const fs = require('fs');
const path = require('path');

const LAYOUT_FILE = path.join(__dirname, 'app/coach/layout.tsx');

function getCurrentState() {
  const content = fs.readFileSync(LAYOUT_FILE, 'utf8');
  const isDevelopmentOnly = content.includes('process.env.NODE_ENV === \'development\'');
  const isAlwaysOn = content.includes('const USE_REFACTORED_LAYOUT = true');
  
  if (isAlwaysOn) return 'always-on';
  if (isDevelopmentOnly) return 'development-only';
  return 'off';
}

function setRefactoredLayout(mode) {
  let content = fs.readFileSync(LAYOUT_FILE, 'utf8');
  
  const flagLines = {
    'development-only': `const USE_REFACTORED_LAYOUT = process.env.NODE_ENV === 'development' || 
  (typeof window !== 'undefined' && localStorage.getItem('use-refactored-layout') === 'true');`,
    'always-on': `const USE_REFACTORED_LAYOUT = true;`,
    'off': `const USE_REFACTORED_LAYOUT = false;`
  };
  
  // Replace the flag line
  content = content.replace(
    /const USE_REFACTORED_LAYOUT = .*;[\s\S]*?(?=import)/,
    flagLines[mode] + '\n\n'
  );
  
  fs.writeFileSync(LAYOUT_FILE, content, 'utf8');
  console.log(`✅ Layout toggled to: ${mode}`);
}

const command = process.argv[2] || 'status';

switch (command) {
  case 'on':
    setRefactoredLayout('always-on');
    break;
  case 'off':
    setRefactoredLayout('off');
    break;
  case 'dev':
    setRefactoredLayout('development-only');
    break;
  case 'status':
    console.log(`Current layout mode: ${getCurrentState()}`);
    break;
  default:
    console.log(`Usage: node toggle-layout.js [on|off|dev|status]
    
Commands:
  on     - Always use refactored layout
  off    - Always use original layout  
  dev    - Use refactored layout in development only
  status - Show current mode
`);
}