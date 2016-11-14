#! /bin/bash
git pull origin
# npm install
node ./initmanifest.js
npm run compile
pm2 restart xiaozhuye