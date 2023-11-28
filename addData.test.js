const fs = require('fs');
const { exec } = require('child_process');

const deleteContents = require('./deleteFolders');

let originalAddress; 
let updatedAddress;
let surname;

let nameIncludedInList = true; // set false for not included
let allowlist = true; // set false for droplist

function extractSecondName(str) {
  const words = str.split(/\s+/);
  return words[2];
}

const runUpdateDocument = () => {
  exec(`python3 document_updater.py target_directory`, (error) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
    }
  });
}

describe("document_updater() using 'Makers' format addresses", () => {
  beforeEach(() => {
    deleteContents('target_directory');
    originalAddress = "Dr Alex Coach \n50 Commercial Street\nLondon\nE1 6LT";
    surname = extractSecondName(originalAddress);
    updatedAddress = `Dr Alex Coach \nMakers Academy\nZetland House\nLondon\nEC2A 4HJ`;
  })

  test("should write updated to finals where test no.1 and 'Makers' format addresses", () => {
    // Arrange
    const list = allowlist ? 'allowlist' : 'droplist';
    const listData = nameIncludedInList ? surname : "Nobody";
    fs.writeFileSync(`./target_directory/originals/${surname}`, originalAddress);
    fs.writeFileSync(`./target_directory/updates/${surname}`, updatedAddress);
    fs.writeFileSync(`./target_directory/${list}`, listData);

    // Act & Assert
    runUpdateDocument();
    setTimeout(() => {
      const data = fs.readFileSync(`./target_directory/finals/${surname}`, 'utf-8');
      expect(data).toEqual(updatedAddress);
    }, 500)
  });

  test("should write updated to finals where test no.2 and 'Makers' format addresses", () => {
    // Arrange
    const list = allowlist ? 'allowlist' : 'droplist';
    const listData = nameIncludedInList ? surname : "Nobody";
    fs.writeFileSync(`./target_directory/originals/${surname}`, originalAddress);
    // fs.writeFileSync(`./target_directory/updates/${surname}`, updatedAddress);
    fs.writeFileSync(`./target_directory/${list}`, listData);

    // Act & Assert
    runUpdateDocument();
    setTimeout(() => {
      const data = fs.readFileSync(`./target_directory/finals/${surname}`, 'utf-8');
      expect(data).toEqual(originalAddress);
    }, 500)
  });
});



