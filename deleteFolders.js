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

    // console.log(`Cleared contents of directory: ${directoryPath}`);

    // Delete the 'finals' directory within the specified directory
    const finalsDirectory = path.join(directoryPath, 'finals');
    if (fs.existsSync(finalsDirectory) && fs.lstatSync(finalsDirectory).isDirectory()) {
      // Recursive call to delete contents of 'finals' directory
      deleteContents(finalsDirectory);

      // After deleting contents, remove 'finals' directory itself
      fs.rmdirSync(finalsDirectory);
      // console.log(`Deleted 'finals' directory within: ${directoryPath}`);
    }
  } else {
    // console.log(`Directory does not exist or is not a directory: ${directoryPath}`);
  }
}

// Get the directory name to clear from the command-line arguments
const directoryToClear = process.argv[2];

// Example: Delete contents of the provided directory and the 'finals' directory within it
if (directoryToClear) {
  deleteContents(directoryToClear);
} else {
  // console.log('Please provide the path of the directory to clear as a command-line argument.');
}

module.exports = deleteContents;
