#!/usr/bin/env node

const fs = require('fs');
// const os = require('os');
const path = require('path');

const frontMatter = require('front-matter');
const Remark = require(`remark`)
const parse = require(`remark-parse`)
const visit = require(`unist-util-visit`);
const toString = require(`mdast-util-to-string`);
const slugs = require(`github-slugger`)();

const svgIcon = `<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`;

const filepath = path.join(__dirname, '../src/app/blog/2023/03/31/think-of-stock.md');
// const filepath = path.join(__dirname, '../src/app/gallery/리눅스 따라하기.md');

if(fs.existsSync(filepath)) {
  let buf = fs.readFileSync(filepath);
  // console.log(buf.toString('utf8'));
  const content = buf.toString();
  const meta = frontMatter(content);

  const remarkOptions = {}
  let remark = new Remark().data(`settings`, remarkOptions);
  const markdownAST = remark.parse(meta.body);

  // console.log('markdownAST = ', markdownAST);
  // console.log(markdownAST.children[0].children);
  // console.log(markdownAST.children[0].position);

  slugs.reset();
  visit(markdownAST, `heading`, node => {

    const icon = svgIcon;
    const isIconAfterHeader = false;
    const className = `anchor`;

    const id = slugs.slug(toString(node));

    function patch(context, key, value) {
      if(!context[key])
        context[key] = value;
      return context[key];
    }

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

  // console.log('markdownAST = ', markdownAST);
  // console.log(markdownAST.children[0].children);
  // console.log(markdownAST.children[0].position);

  const hastToHTML = require(`hast-util-to-html`);
  const toHAST = require(`mdast-util-to-hast`);
  const defaultHandler = require(`mdast-util-to-hast/lib/handlers/code`);

  // function codeHandler(h, node) {
  //   const result = defaultHandler(h, node);
  //   if(node.meta && result.children[0]) {
  //     result.children[0].properties.dataMeta = node.meta;
  //   }
  //   return result;
  // }

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
  
  // console.log(generateHTML(markdownAST));

  const toc = require(`mdast-util-toc`);
  const tocAst = toc(markdownAST);
  const tableOfContent = tocAst.map ? generateHTML(tocAst.map) : '';
  console.log('tocAST = ', tocAst);
  console.log('tableOfContent = ', tableOfContent);
}
