const fs = require('fs');
// const path = require('path');
const deleteContents = require('./deleteFolders')
const allowlist = false; // set false for droplist
const clearFolders = true;

if (clearFolders) deleteContents('target_directory');

const list = allowlist ? 'allowlist' : 'droplist';

const address1 = "Dr Alex Coach \n50 Commercial Street\nLondon\nE1 6LT";
const fileName = extractSecondName(address1);
const address2 = `Dr Alex ${fileName} \nMakers Academy\nZetland House\nLondon\nEC2A 4HJ`;

function extractSecondName(str) {
  const words = str.split(/\s+/);
  return words[2];
}

fs.writeFileSync(`./target_directory/originals/${fileName}`, address1);

fs.writeFileSync(`./target_directory/updates/${fileName}`, address2);

// Line below creates droplist or allowlist
fs.writeFileSync(`./target_directory/${list}`, fileName);
// fs.writeFileSync(`./target_directory/${list}`, "Bloggs");


