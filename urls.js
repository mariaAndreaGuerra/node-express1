const fs = require('fs');
const http = require('http');
const https = require('https');
const urlModule = require('url');

// Function to make GET request and save HTML to file
function saveHtml(url, fileName) {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            fs.writeFile(fileName, data, (err) => {
                if (err) {
                    console.error(`Error writing file ${fileName}:`, err);
                } else {
                    console.log(`HTML saved to ${fileName}`);
                }
            });
        });
    }).on('error', (err) => {
        console.error(`Error fetching URL ${url}:`, err);
    });
}

// Main function
function main() {
    const fileName = process.argv[2];

    if (!fileName) {
        console.error('Please provide a file name.');
        return;
    }

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${fileName}:`, err);
            return;
        }

        const urls = data.trim().split('\n');

        urls.forEach((url) => {
            const hostname = urlModule.parse(url).hostname;
            const fileName = `${hostname}.html`;
            saveHtml(url, fileName);
        });
    });
}

// Execute main function with error handling
try {
    main();
} catch (error) {
    console.error('An error occurred:', error);
    process.exit(1); // Terminate with error code 1
}
