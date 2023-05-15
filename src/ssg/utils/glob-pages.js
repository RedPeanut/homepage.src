const glob = require('glob');
const buildPage = require('./build-page');
// const pageFileTypes = require('./page-file-types');
const debug = require('debug')('ssg:glob');

const pageFileTypes = [
  'coffee',
  'cjsx',
  'ts',
  'tsx',
  'jsx',
  'js',
  'md',
  'rmd',
  'mkd',
  'mkdn',
  'mdwn',
  'mdown',
  'markdown',
  'litcoffee',
  'html',
  'json',
  'yaml',
  'toml',
  'ipynb',
];

function globQuery(directory) {
  const fileGlobQuery = pageFileTypes.map(type => `*.${type}`)
  const joinedFileQuery = fileGlobQuery.join('|')
  return `${directory}/+(blog|gallery)/**/?(${joinedFileQuery})`
}

let globCache
function createCache(directory, callback) {
  
  glob(globQuery(directory), { follow: true }, (err, posts) => {
    if (err) {
      return callback(err)
    }
    
    const postsData = []
    // console.log('directory = ', directory);
    // console.log('posts = ', posts);

    posts.forEach(post => {
      postsData.push(buildPage(directory, post))
    })

    const resultData = 
      process.env.NODE_ENV === 'production'
      ? postsData.filter(item => 
        item.file.basename !== 'sample.md'
      ) : postsData;
    // console.log();
    // console.log('resultData = ', resultData);
    
    debug(`globbed ${resultData.length} posts`)
    globCache = resultData
    return callback(null, resultData)
  })
}

module.exports = function globPages(directory, callback) {
  if (typeof globCache === 'undefined') {
    createCache(directory, callback)
  } else {
    callback(null, globCache)
  }
}
