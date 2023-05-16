const fs = require('fs-extra');

const path = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const src = `${path}/index.html`;
const dst = `${path}/404.html`;

fs.copy(src, dst, function(err) {
  if(err) {
    return console.error(err);
  }
  console.log(`Copied ${src} to ${dst}`);
});