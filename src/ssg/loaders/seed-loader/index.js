const toml = require('toml');
const loaderUtils = require('loader-utils');
const path = require('path');
const globPages = require('../../utils/glob-pages');

module.exports = function(source) {
  console.log('');
  console.log('seed-loader is called...');
  // console.log('this.query = ', this.query);
  console.log('source = ', source);
  const options = this.getOptions();
  
  this.cacheable();
  const callback = this.async();
  const directory = options.directory;
  const config = toml.parse(source);

  const value = {};
  value.config = config;
  value.relativePath = path.relative('.', directory);
  value.posts = [];
  globPages(directory, (err, postsData) => {
    value.posts = postsData;
    return callback(
      null,
      `module.exports = ${JSON.stringify(value, null, '\t')}`
    );
  });
}
