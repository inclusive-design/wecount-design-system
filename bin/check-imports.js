/* eslint-disable no-console */

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

fs.readFile("./src/static/css/main.css", "utf8", (error, data) => {
    const filenames = fs.readdirSync("./src/static/css/")
        .map(file => path.basename(file));


    filenames.forEach(filename => {
        if (filename !== "main.css") {
            if (!data.includes(`@import "${filename}";`)) {
                console.error(chalk.red(`Error: "${filename}" not imported.`));
                process.exit(1);
            }
        }
    });

    console.log(chalk.green("Success! All files are imported."));
    process.exit();
});
