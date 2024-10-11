//fs
const fs = require('fs');

let package = JSON.parse(fs.readFileSync('package.json', 'utf8'));

package.type = "module";

fs.writeFileSync('package.json', JSON.stringify(package), 'utf8');