const fs = require('fs');
const path = require('path');

const testdir = process.argv[2];
try {
    process.chdir(testdir);
} catch (error) {
    console.error("ERROR: must supply a target directory as an argument");
    process.exit(1);
}

const contents = fs.readdirSync(testdir);

let listfiletype = "";
let top = Math.pow(2, 6);

try {
    let listsFound = 0;

    if (contents.includes("droplist")) {
        listsFound++;
        listfiletype = "drop";
    }

    if (contents.includes("allowlist")) {
        listsFound++;
        listfiletype = "allow";
    }

    if (listsFound === 2) {
        throw new Error();
    } else if (listsFound === 0) {
        throw new Error();
    }
} catch (error) {
    console.error(`ERROR: ${listsFound === 2 ? 'both' : 'no'} droplist and allowlist found in target directory`);
    process.exit(1);
}

let listData;
try {
    listData = fs.readFileSync(`${listfiletype}list`, 'utf8').split('\n');
} catch (error) {
    console.error(`ERROR: ${listfiletype}list file not found in target directory`);
    process.exit(1);
}

const listDocs = listData.map(line => line.trim());

let originalDocs;
try {
    originalDocs = fs.readdirSync(path.join(testdir, 'originals'));
} catch (error) {
    console.error("ERROR: originals folder not found in target directory");
    process.exit(1);
}

let updateDocs;
try {
    updateDocs = fs.readdirSync(path.join(testdir, 'updates'));
} catch (error) {
    console.error("ERROR: updates folder not found in target directory");
    process.exit(1);
}

let errorFile = "";
try {
    originalDocs.forEach(originalDoc => {
        const contents = fs.readFileSync(path.join(testdir, 'originals', originalDoc), 'utf8').split('\n');
        if (!(contents.length >= 4 && contents.length <= 5)) {
            errorFile = originalDoc;
            throw new Error();
        }
    });

    updateDocs.forEach(updateDoc => {
        const contents = fs.readFileSync(path.join(testdir, 'updates', updateDoc), 'utf8').split('\n');
        if (!(contents.length >= 4 && contents.length <= 5)) {
            errorFile = updateDoc;
            throw new Error();
        }
    });
} catch (error) {
    console.error(`ERROR: document "${errorFile}" doesn't contain an appropriately formatted address`);
    process.exit(1);
}

const finalsDir = path.join(testdir, 'finals');
if (!fs.existsSync(finalsDir)) {
    fs.mkdirSync(finalsDir);
} else {
    const finalDocs = fs.readdirSync(finalsDir);
    finalDocs.forEach(finalDoc => {
        fs.unlinkSync(path.join(finalsDir, finalDoc));
    }

  )}

if (listfiletype === "allow") {
    let inUpdateAsWell = false;
    let notInUpdateAsWell = false;
    const toDrop = [];

    originalDocs.forEach(originalDoc => {
        if (originalDoc in updateDocs && originalDoc in listDocs) {
            inUpdateAsWell = true;
        } else if (!(originalDoc in updateDocs) && originalDoc in listDocs) {
            notInUpdateAsWell = true;
            toDrop.push(originalDoc);
        }
    });

    if (inUpdateAsWell && notInUpdateAsWell) {
        toDrop.forEach(d => {
            const index = originalDocs.indexOf(d);
            if (index !== -1) {
                originalDocs.splice(index, 1);
            }
        });
    }
}

if (listfiletype === "drop") {
    listDocs.forEach(dropDoc => {
        if (originalDocs.includes(dropDoc)) {
            const index = originalDocs.indexOf(dropDoc);
            if (index !== -1) {
                originalDocs.splice(index, 1);
            }
        }
    });
} else {
    originalDocs.forEach(keepDoc => {
        if (!listDocs.includes(keepDoc)) {
            const index = originalDocs.indexOf(keepDoc);
            if (index !== -1) {
                originalDocs.splice(index, 1);
            }
        }
    });
}

function blend(orig, update) {
    const out = [];
    for (let i = 0; i < Math.max(orig.length, update.length); i++) {
        const first = i < orig.length ? orig[i].trim() : '';
        const second = i < update.length ? update[i].trim() : '';
        out.push(second + first.substring(second.length) + "\n");
    }
    return out;
}

updateDocs.forEach(updateDoc => {
    if (originalDocs.includes(updateDoc)) {
        if (listfiletype === "drop") {
            if (!fs.existsSync("blends")) {
                fs.mkdirSync("blends");
            }

            const origData = fs.readFileSync(path.join(testdir, 'originals', updateDoc), 'utf8').split('\n');
            const updateData = fs.readFileSync(path.join(testdir, 'updates', updateDoc), 'utf8').split('\n');
            const blended = blend(origData, updateData);

            fs.writeFileSync(path.join(testdir, 'blends', updateDoc), blended.join(''));
            updateDocs.splice(updateDocs.indexOf(updateDoc), 1);
            originalDocs.splice(originalDocs.indexOf(updateDoc), 1);
        } else {
            originalDocs.splice(originalDocs.indexOf(updateDoc), 1);
        }
    }
});

originalDocs.slice(0, top).forEach(originalDoc => {
    const sourcePath = path.join(testdir, 'originals', originalDoc);
    const destPath = path.join(testdir, 'finals', originalDoc.replace(/[^a-zA-Z]/g, ''));
    fs.copyFileSync(sourcePath, destPath);
});

updateDocs.slice(0, top).forEach(updateDoc => {
    const sourcePath = path.join(testdir, 'updates', updateDoc);
    const destPath = path.join(testdir, 'finals', updateDoc.replace(/[^a-zA-Z]/g, ''));
    fs.copyFileSync(sourcePath, destPath);
});

try {
    const blendDocs = fs.readdirSync(path.join(testdir, 'blends'));
    blendDocs.forEach(blendDoc => {
        const sourcePath = path.join(testdir, 'blends', blendDoc);
        const destPath = path.join(testdir, 'finals', blendDoc.replace(/[^a-zA-Z]/g, ''));
        fs.copyFileSync(sourcePath, destPath);
    });
    fs.rmdirSync(path.join(testdir, 'blends'), { recursive: true });
} catch (error) {
    // "blends" folder not found
}
