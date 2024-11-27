import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Directory containing the built JavaScript files
const buildDir = './build'; 

/**
 * Recursively process files in a directory
 * @param {string} dir - Directory path
 */
function processDirectory(dir) {
    readdirSync(dir).forEach((file) => {
        const fullPath = join(dir, file);

        if (statSync(fullPath).isDirectory()) {
            // Recursively process subdirectories
            processDirectory(fullPath);
        } else if (file.endsWith('.js')) {
            // Process .js files
            processFile(fullPath);
        }
    });
}

/**
 * Add .js extensions to imports in a file
 * @param {string} filePath - File path
 */
function processFile(filePath) {
    const content = readFileSync(filePath, 'utf8');

    // Update import/export statements to add .js extension
    const updatedContent = content.replace(
        /((import|export).*?['"])(\..*?)(?=['"])/g,
        '$1$3.js'
    );

    writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated: ${filePath}`);
}

// Start processing the build directory
processDirectory(buildDir);
