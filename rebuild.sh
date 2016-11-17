#! /bin/bash
git checkout view/home/index_index.html
git pull origin
# npm install
node ./fe-xiaozhuye.js
npm run compile
pm2 restart xiaozhuye