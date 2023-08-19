const frontMatter = require('front-matter')
// const markdownIt = require('markdown-it')
// const hljs = require('highlight.js')
const objectAssign = require('object-assign')
const loaderUtils = require('loader-utils')
const path = require('path')
const excerptHtml = require('excerpt-html')

/* const highlight = (str, lang) => {
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
  }).use(require('markdown-it-replace-link')) */

const Remark = require(`remark`);
// const parse = require(`remark-parse`);
const visit = require(`unist-util-visit`);
const toString = require(`mdast-util-to-string`);
const slugs = require(`github-slugger`)();
slugs.reset();

const svgIcon = `<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`;

function autoLinkHeaders(markdownAST) {

  function patch(context, key, value) {
    if(!context[key])
      context[key] = value;
    return context[key];
  }

  visit(markdownAST, `heading`, node => {

    const icon = svgIcon;
    const isIconAfterHeader = false;
    const className = `anchor`;

    const id = slugs.slug(toString(node));

    const data = patch(node, `data`, {});
    patch(data, `id`, id);
    patch(data, `htmlAttributes`, {});
    patch(data, `hProperties`, {});
    patch(data.htmlAttributes, `id`, id);
    patch(data.hProperties, `id`, id);

    const label = id.split(`-`).join(` `);
    const method = isIconAfterHeader ? `push` : `unshift`;
  
    node.children[method]({
      type: `link`,
      url: `#${id}`,
      title: null,
      children: [],
      data: {
        hProperties: {
          "aria-label": `${label} permalink`,
          class: `${className} ${isIconAfterHeader ? `after` : `before`}`,
        },
        hChildren: [
          {
            type: `raw`,
            // The Octicon link icon is the default. But users can set their own icon via the "icon" option.
            value: icon,
          },
        ],
      },
    });
  });
}

module.exports = function(content) {
  // console.log('');
  // console.log('markdown-loader() is called...')
  this.cacheable()

  // const query = loaderUtils.parseQuery(this.query)
  /* const linkPrefix = (query.config && query.config.linkPrefix) || ''
  const shouldPrefix = query.shouldPrefix

  const meta = frontMatter(content)
  const body = md(linkPrefix, shouldPrefix).render(meta.body) */
  
  const meta = frontMatter(content)
  const remarkOptions = {}
  let remark = new Remark().data(`settings`, remarkOptions);
  const markdownAST = remark.parse(meta.body);
  
  autoLinkHeaders(markdownAST);
  
  const hastToHTML = require(`hast-util-to-html`);
  const toHAST = require(`mdast-util-to-hast`);
  const defaultHandler = require(`mdast-util-to-hast/lib/handlers/code`);

  function markdownASTToHTMLAst(ast) {
    return toHAST(ast, {
      allowDangerousHtml: true,
      handlers: { code: defaultHandler },
    });
  }

  function generateHTML(ast) { 
    return hastToHTML(markdownASTToHTMLAst(ast), {
      allowDangerousHtml: true,
    });
  }
  const body = generateHTML(markdownAST);
  
  const excerpt = excerptHtml(body, {
    //moreRegExp: /\s*<!--\s*more\s*-->/i, // Search for the slug
    stripTags: true, // Set to false to get html code
    pruneLength: 200, // Amount of characters that the excerpt should contain
    pruneString: '…', // Character that will be added to the pruned string
    pruneSeparator: ' ', // Separator to be used to separate words
  });

  const toc = require(`mdast-util-toc`);
  const tocAst = toc(markdownAST);
  const tableOfContents = tocAst.map ? generateHTML(tocAst.map) : '';
  // console.log('tocAST = ', tocAst);
  // console.log(generateHTML(tocAst.map));

  const result = objectAssign({}, meta.attributes, {
    body, excerpt, tableOfContents
  });
  
  this.value = result;
  return `module.exports = ${JSON.stringify(result)}`;
}
