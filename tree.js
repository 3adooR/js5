const fs = require('fs');
const path = process.argv[2];

class Tree {
    /**
     * Result
     * @type {{files: [], dirs: []}}
     */
    result = {
        files: [],
        dirs: []
    };

    /**
     * Number directories to listing
     * @type {number}
     */
    listToDo = 1;

    /**
     * Number listed directories
     * @type {number}
     */
    listDone = 0;

    /**
     * Constructor
     * @param path
     */
    constructor(path = '') {
        if (!path.length) {
            this.error('Empty path');
        } else {
            this.listDir(path);
        }
    }

    /**
     * List dirs and files
     * @param dir
     */
    listDir(dir = '') {
        fs.readdir(dir, (err, files) => {
            if (err) {
                this.error(err.message);
            } else {
                this.listDone++;

                // Add current dir to result
                this.result.dirs.push(dir);

                // Listing files
                files.forEach(file => {
                    let filePath = dir + file;
                    let isDir = fs.lstatSync(filePath).isDirectory();
                    if (isDir) {
                        // If it is a directory, listing it
                        this.listToDo++;
                        filePath += '/';
                        this.listDir(filePath);
                    } else {
                        // Add current file to result
                        this.result.files.push(filePath);
                    }
                });

                // Show result
                if (this.listDone === this.listToDo) {
                    this.showResult();
                }
            }
        });
    }

    /**
     * Show the result of listing
     */
    showResult() {
        console.log(this.result);
    }

    /**
     * Show error
     * @param message
     */
    error(message) {
        console.error(`ERROR: ${message}`);
    }
}

// Run script
new Tree(path);