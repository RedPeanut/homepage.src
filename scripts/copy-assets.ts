export {};
const fs = require('fs-extra');

const path = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

let src = `src/www`;
let dst = `${path}/`;

fs.copy(src, dst, function(err) {
  if(err) return console.error(err);
  console.log(`Copied ${src} to ${dst}`);
});

// dst = `${path}/tools/`;
// fs.copy(src, dst, function(err) {
//   if(err) return console.error(err);
//   console.log(`Copied ${src} to ${dst}`);
// });