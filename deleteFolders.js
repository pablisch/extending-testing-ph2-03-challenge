const fs = require('fs');
const path = require('path');

// Function to delete all files and subdirectories inside a directory
function deleteContents(directoryName) {
  const directoryPath = path.resolve(directoryName);

  if (fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory()) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursive call for subdirectories
        deleteContents(currentPath);
      } else {
        // Delete file
        fs.unlinkSync(currentPath);
      }
    });

    console.log(`Cleared contents of directory: ${directoryPath}`);
  } else {
    console.log(`Directory does not exist or is not a directory: ${directoryPath}`);
  }
}

// Get the directory name to clear from the command-line arguments
const directoryToClear = process.argv[2];

// Example: Delete contents of the provided directory
if (directoryToClear) {
  deleteContents(directoryToClear);
} else {
  console.log('Please provide the path of the directory to clear as a command-line argument.');
}

module.exports = deleteContents;
