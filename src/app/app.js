import React from "react";
import ReactDOM from "react-dom";
import {IndexRoute, Route, Router, Routes, useRouterHistory, BrowserRouter, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {createHashHistory} from "history";

//
import load from "./utils/load";

const globals = require("./config/" + process.env.NODE_ENV + "/globals");
const store = configureStore();
const history = useRouterHistory(createHashHistory)({queryKey: false});

import DebugRouter from "./router/DebugRouter";

window.onload = function() {}
window.onerror = function(messageOrEvent, source, lineNo, columnNo, error) {}

function handleRouterUpdate() {
  //console.log('handleRouterUpdate() is called...')
}

function loadSeed(cb) {
  // console.log('loadSeed() is called...');
  const stuff = require('seed');
  // console.log('stuff = ', stuff);
  // console.log('module.hot = ', module.hot);
  if(module.hot) {
    module.hot.accept(stuff.id, () => cb());
  }
  return cb();
}

function loadContext(callback) {
  // console.log('loadContext() is called...');
  let context = require.context(
    '.', // directory
    true, // useSubdirectories
    /(coffee|cjsx|ts|tsx|jsx|js|md|rmd|mkdn?|mdwn|mdown|markdown|litcoffee|ipynb|html|json|yaml|toml)$/ // regExp
  );
  
  if (module.hot) {
    module.hot.accept(context.id, () => {
      context = require.context(
        '.',
        true,
        /(coffee|cjsx|ts|tsx|jsx|js|md|rmd|mkdn?|mdwn|mdown|markdown|litcoffee|ipynb|html|json|yaml|toml)$/
      );
      return callback(context)
    });
  }
  return callback(context)
}

import createRoutes from 'create-routes'
let routes;

loadSeed(() => {
  loadContext(
    (context) => {
      const { posts } = require('seed');

      if(!routes) {
        routes = createRoutes(posts, context);
        // console.log('routes = ', routes);
      } else
        createRoutes(posts, context);
      console.log('routes = ', routes);
      
      // let {path, component, childRoutes, indexRoute, pages, templates} = routes;

      const Root = () => (
        <Provider store={store}>
          <Router 
            history={browserHistory}
            onUpdate={handleRouterUpdate}
          >
            <Route path="/"
              getComponent={(location, cb) => {
                load(System.import('./components/Layout'), cb)
              }}
            >
              <Route path="about"
                getComponent={(location, cb) => {
                  load(System.import('./pages/about'), cb)
                }}/>
              <Route path="blog" 
                getComponent={(location, cb) => {
                  load(System.import('./pages/blog'), cb)
                }}
                pages={routes.pages}
              />
              <Route path="gallery" 
                getComponent={(location, cb) => {
                  load(System.import('./pages/blog'), cb)
                }}
                pages={routes.pages}
              />
              <Route path="tools" 
                getComponent={(location, cb) => {
                  load(System.import('./pages/tools'), cb)
                }}/>
            </Route>
            <Route 
              path={routes.path}
              component={routes.component}
              childRoutes={routes.childRoutes}
              indexRoute={routes.indexRoute}
              pages={routes.pages}
              templates={routes.templates}
            />
            <Route path="*"
              getComponent={(location, cb) => {
                load(System.import('./pages/404'), cb)
              }}/>
          </Router>
        </Provider>
      );

      ReactDOM.render(
        <Root/>,
        document.getElementById('app')
      );
    }
  )
});

