import fs from 'fs';

module.exports = JSON.parse(fs.readFileSync('src/tmdb/credentials.example.json').toString());
