import * as ghpages from 'gh-pages'

ghpages.publish('prod', {
  branch: 'main',
  repo: 'https://github.com/RedPeanut/homepage.git',
  dotfiles: true,
}, ()=>{});
