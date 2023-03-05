const path = require('path');
const objectAssign = require('object-assign');
const pathResolver = require('./path-resolver');
const loadFrontmatter = require('./load-frontmatter');

module.exports = function buildPage(directory, page) {
  const pageData = loadFrontmatter(page)

  const relativePath = path.relative(
    path.join(directory),
    page
  )
  const pathData = pathResolver(relativePath, pageData)

  return objectAssign({}, pathData, { data: pageData })
}
