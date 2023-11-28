const fs = require('fs');
// const path = require('path');
const deleteContents = require('./deleteFolders');
const allowlist = true; // set false for droplist
const clearFolders = true;

if (clearFolders) deleteContents('target_directory');

const list = allowlist ? 'allowlist' : 'droplist';

const name = 'Sam Green'

const add1Line1 = '';
const add1Line2 = 'My Road';
const add1Line3 = 'My Town';
const add1Line4 = 'My City';
const add1Line5 = 'P1 1PP';
const add1Line6 = '';

const add2Line1 = '';
const add2Line2 = 'My New Road';
const add2Line3 = 'My New Town';
const add2Line4 = 'My New City';
const add2Line5 = 'P1 2PP';
const add2Line6 = '';

const add1Array = [name]
const add2Array = [name]

if (add1Line1) add1Array.push(add1Line1)
if (add1Line2) add1Array.push(add1Line2)
if (add1Line3) add1Array.push(add1Line3)
if (add1Line4) add1Array.push(add1Line4)
if (add1Line5) add1Array.push(add1Line5)
if (add1Line6) add1Array.push(add1Line6)

if (add2Line1) add2Array.push(add2Line1)
if (add2Line2) add2Array.push(add2Line2)
if (add2Line3) add2Array.push(add2Line3)
if (add2Line4) add2Array.push(add2Line4)
if (add2Line5) add2Array.push(add2Line5)
if (add2Line6) add2Array.push(add2Line6)

const address1 = add1Array.join('\n')
const address2 = add2Array.join('\n')

// const address1 =
//   'Joe Bloggs \nMy House\nMy Road\nMy Town\nMy City\nN22 1HQ\nUK';
const fileName = extractSecondName(address1);
// const address2 = `Joe ${fileName} \nMy New House\nMy New Road\nMy New Town\nMy New City\nN22 2HQ\nUK`;

function extractSecondName(str) {
  const words = str.split(/\s+/);
  return words[1];
}


fs.writeFileSync(`./target_directory/originals/${fileName}`, address1);
fs.writeFileSync(`./target_directory/updates/${fileName}`, address2);
fs.writeFileSync(`./target_directory/${list}`, fileName);
// fs.writeFileSync(`./target_directory/${list}`, 'Bloggs');
