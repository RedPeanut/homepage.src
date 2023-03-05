const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')
const hljs = require('highlight.js')
const objectAssign = require('object-assign')
const loaderUtils = require('loader-utils')
const path = require('path')
const excerptHtml = require('excerpt-html')

const highlight = (str, lang) => {
  if (lang !== null && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return hljs.highlightAuto(str).value
  } catch (_error) {
    console.error(_error)
  }
  return ''
}

const md = (linkPrefix, shouldPrefix) =>
  markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight,
    replaceLink: link => {
      if (shouldPrefix && path.isAbsolute(link)) {
        return linkPrefix + link
      }
      return link
    },
  }).use(require('markdown-it-replace-link'))

module.exports = function(content) {
  // console.log('');
  // console.log('markdown-loader() is called...')
  this.cacheable()

  const query = loaderUtils.parseQuery(this.query)
  const linkPrefix = (query.config && query.config.linkPrefix) || ''
  const shouldPrefix = query.shouldPrefix

  const meta = frontMatter(content)
  const body = md(linkPrefix, shouldPrefix).render(meta.body)
  const excerpt = excerptHtml(body, {
    //moreRegExp: /\s*<!--\s*more\s*-->/i, // Search for the slug
    stripTags: true, // Set to false to get html code
    pruneLength: 200, // Amount of characters that the excerpt should contain
    pruneString: '…', // Character that will be added to the pruned string
    pruneSeparator: ' ', // Separator to be used to separate words
})
  const result = objectAssign({}, meta.attributes, {
    body, excerpt
  })
  this.value = result
  return `module.exports = ${JSON.stringify(result)}`
}
