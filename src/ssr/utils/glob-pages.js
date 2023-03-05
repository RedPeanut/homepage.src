const glob = require('glob');
const buildPage = require('./build-page');
// const pageFileTypes = require('./page-file-types');
const debug = require('debug')('ssr:glob');

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
  const postsData = []

  glob(globQuery(directory), { follow: true }, (err, posts) => {
    if (err) {
      return callback(err)
    }

    posts.forEach(post => {
      postsData.push(buildPage(directory, post))
    })

    debug(`globbed ${postsData.length} posts`)
    globCache = postsData
    return callback(null, postsData)
  })
}

module.exports = function globPages(directory, callback) {
  if (typeof globCache === 'undefined') {
    createCache(directory, callback)
  } else {
    callback(null, globCache)
  }
}
