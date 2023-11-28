const fs = require('fs');
// const path = require('path');
const deleteContents = require('./deleteFolders')
const allowlist = true; // set false for droplist
const clearFolders = true;

if (clearFolders) deleteContents('target_directory');

const list = allowlist ? 'allowlist' : 'droplist';

const address1 = "Joe Bloggs \nMy House\nMy Road\nMy Town\nMy City\nN22 1HQ\nUK";
const fileName = extractSecondName(address1);
const address2 = `Joe ${fileName} \nMy New House\nMy New Road\nMy New Town\nMy New City\nN22 2HQ\nUK`;

function extractSecondName(str) {
  const words = str.split(/\s+/);
  return words[1];
}


fs.writeFileSync(`./target_directory/originals/${fileName}`, address1);
fs.writeFileSync(`./target_directory/updates/${fileName}`, address2);
fs.writeFileSync(`./target_directory/${list}`, fileName);


