#!/usr/bin/env node

const fs = require('fs');
// const os = require('os');
const path = require('path');

const frontMatter = require('front-matter');
const markdownIt = require('markdown-it');
const toc = require('markdown-toc');

const md = (linkPrefix = '', shouldPrefix = '') =>
  markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    undefined,
    replaceLink: link => {
      if (shouldPrefix && path.isAbsolute(link)) {
        return linkPrefix + link
      }
      return link
    },
  }).use(require('markdown-it-replace-link'));

const filepath = path.join(__dirname, '../src/app/blog/2023/03/31/think-of-stock.md');
if(fs.existsSync(filepath)) {
  let buf = fs.readFileSync(filepath);
  // console.log(buf.toString('utf8'));
  const content = buf.toString();
  const meta = frontMatter(content);
  // console.log('meta = ', meta);
  const body = md().render(meta.body)
  console.log('body = ', body);
  // console.log(toc(meta.body, {maxdepth:1}).json);
  // console.log(toc(meta.body).content);
  console.log(md().render(toc(meta.body).content));
}
