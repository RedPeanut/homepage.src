const path = require('path');
const _ = require('lodash');
const urlencode = require('urlencode');

let rewritePath
try {
  const gatsbyNodeConfig = path.resolve(process.cwd(), './gatsby-node')
  // $FlowIssue - https://github.com/facebook/flow/issues/1975
  const nodeConfig = require(gatsbyNodeConfig)
  rewritePath = nodeConfig.rewritePath
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND' && !_.includes(e.Error, 'gatsby-node')) {
    console.log(e)
  }
}

module.exports = function pathResolver(pageData, parsedPath) {
  /**
   * Determines if a hardcoded path was given in the frontmatter of a page.
   * Then enforces a starting and trailing slash where applicable on the url.
   */
  function hardcodedPath() {
    // console.log('');
    // console.log('hardcodedPath() is called...');
    if (_.isUndefined(pageData.path)) return undefined

    let pagePath = pageData.path

    // Deforce a starting slash on all paths
    const pathStartsWithSlash = _.startsWith(pagePath, '/')
    if (pathStartsWithSlash) {
      pagePath = `${pagePath}`
    }

    // Enforce a trailing slash on all paths
    const pathHasExtension = path.extname(pagePath) !== ''
    const pathEndsWithSlash = _.endsWith(pagePath, '/')
    if (!pathEndsWithSlash && !pathHasExtension) {
      pagePath = `${pagePath}/`
    }

    return pagePath
  }

  /**
   * Determines if the path should be rewritten using rules provided by the
   * user in the gatsby-node.js config file in the root of the project.
   */
  function rewrittenPath() {
    // console.log('rewrittenPath() is called...');
    if (rewritePath) {
      return rewritePath(parsedPath, pageData)
    } else {
      return undefined
    }
  }

  /**
   * Determines the path of the page using the default of its location on the
   * filesystem.
   */
  function defaultPath() {
    // console.log('defaultPath() is called...');
    const { dirname } = parsedPath
    let { name } = parsedPath
    if (name === 'template' || name === 'index') {
      name = ''
    }
    return path.join(dirname, urlencode(name), '/')
  }

  /**
   * Returns a path for a page. If the page name starts with an underscore,
   * undefined is returned as it does not become a page.
   */
  if (!_.startsWith(parsedPath.name, '_')) {
    return hardcodedPath() || rewrittenPath() || defaultPath()
  } else {
    return undefined
  }
}
