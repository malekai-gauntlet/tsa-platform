#!/usr/bin/env node

/**
 * Prepare Lambda Deployment
 * 
 * This script prepares the Lambda function for deployment by copying all
 * required dependencies from shared libraries into the function directory.
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.cyan}=====================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}    Preparing Lambda Deployment    ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}=====================================${colors.reset}`);

// Function to recursively create directory
function mkdirRecursive(dir) {
  if (fs.existsSync(dir)) return;
  
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (error) {
    console.error(`${colors.red}Error creating directory ${dir}: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Function to copy a file
function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target);
  } catch (error) {
    console.error(`${colors.red}Error copying ${source} to ${target}: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Function to recursively copy a directory
function copyDir(src, dest) {
  // Create destination directory
  mkdirRecursive(dest);
  
  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  // Process each entry
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy directory
      copyDir(srcPath, destPath);
    } else {
      // Copy file
      copyFile(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
}

// Main function
function main() {
  const projectRoot = process.cwd();
  const functionDir = path.join(projectRoot, 'amplify', 'functions', 'coach-invite');
  
  // Check if function directory exists
  if (!fs.existsSync(functionDir)) {
    console.error(`${colors.red}Function directory not found: ${functionDir}${colors.reset}`);
    console.error(`${colors.red}Make sure to run this script from the project root${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`${colors.blue}Function directory: ${functionDir}${colors.reset}`);
  
  // Define shared libraries to copy
  const sharedLibs = [
    { src: 'lib/data-access', dest: 'lib/data-access' },
    { src: 'lib/validation', dest: 'lib/validation' },
    { src: 'lib/types', dest: 'lib/types' }
  ];
  
  // Copy each shared library
  console.log(`\n${colors.blue}${colors.bold}Copying shared libraries...${colors.reset}`);
  
  sharedLibs.forEach(lib => {
    const srcPath = path.join(projectRoot, lib.src);
    const destPath = path.join(functionDir, lib.dest);
    
    console.log(`\n${colors.yellow}Copying ${lib.src} to function...${colors.reset}`);
    
    if (!fs.existsSync(srcPath)) {
      console.error(`${colors.red}Source directory not found: ${srcPath}${colors.reset}`);
      process.exit(1);
    }
    
    // Remove destination if it exists
    if (fs.existsSync(destPath)) {
      console.log(`Removing existing directory: ${destPath}`);
      fs.rmSync(destPath, { recursive: true, force: true });
    }
    
    // Copy directory
    copyDir(srcPath, destPath);
  });
  
  console.log(`\n${colors.green}${colors.bold}Successfully prepared Lambda function for deployment!${colors.reset}`);
  console.log(`${colors.green}Shared libraries were copied to: ${functionDir}/lib${colors.reset}`);
}

// Run the script
main();