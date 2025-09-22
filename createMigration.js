#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get migration name from CLI argument
const name = process.argv[2];
if (!name) {
    console.error("❌ Please provide a migration name");
    process.exit(1);
}

// Timestamp (YYYYMMDDHHMMSS)
const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

// File name
const fileName = `${timestamp}-${name}.js`;
const dir = path.join(__dirname, "migrations");
const filePath = path.join(dir, fileName);

// Ensure migrations directory exists
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Template content
const template = `module.exports = {
  async up(db, client) {
    // TODO: write migration for ${name}
  },

  async down(db, client) {
    // TODO: rollback migration for ${name}
  }
};`;

// Write file
fs.writeFileSync(filePath, template);

console.log(`✅ Migration file created: /migrations/${fileName}`);
