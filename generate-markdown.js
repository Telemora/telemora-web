#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// === CONFIG ===

// List of file formats to include
const fileFormats = ['.js', '.ts', '.json', 'Dockerfile', '.tsx', '.mjs', '.yml'];

// Directories to ignore at any depth
const ignoreDirs = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.idea',
  '.huskey',
  '.cache',
  '.vscode',
];

// Output file name
const outputFile = path.join(__dirname, 'output.md');

// === HELPERS ===

/** Get the language for a given file extension by just dropping the dot */
function getLanguageFromExt(ext) {
  return ext.startsWith('.') ? ext.slice(1) : ext;
}

/** Recursively walk a directory and call `onFile(filePath)` for each file */
function walkDir(dir, onFile) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue; // avoid symlink loops
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (ignoreDirs.includes(entry.name)) continue;
      walkDir(fullPath, onFile);
    } else if (entry.isFile()) {
      onFile(fullPath);
    }
  }
}

// === MAIN ===

function generateMarkdown() {
  const baseDir = __dirname;
  let outputChunks = [];

  walkDir(baseDir, (filePath) => {
    if (path.resolve(filePath) === path.resolve(outputFile)) return;

    const ext = path.extname(filePath).toLowerCase();
    if (!fileFormats.includes(ext) || filePath.includes('package-lock.json')) return;

    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.warn(`⚠️  Skipping unreadable file: ${filePath} (${err.message})`);
      return;
    }

    const relPath = path.relative(baseDir, filePath).split(path.sep).join('/');
    const lang = getLanguageFromExt(ext);

    outputChunks.push(`### file path: ${relPath}\n`);
    outputChunks.push('```' + lang);
    outputChunks.push(content);
    outputChunks.push('```\n\n');
  });

  fs.writeFileSync(outputFile, outputChunks.join('\n').trim() + '\n', 'utf8');
  console.log(`✅ Markdown file generated at: ${outputFile}`);
}

generateMarkdown();
