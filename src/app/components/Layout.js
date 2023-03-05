import React, {} from "react"
import "../../www/css/style.css"
import Icon from "./Icon"
import ICONS from "../utils/icons"
import About from "../pages/about"

export class Layout extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        { this.props.children }
      </div>
    )
  }
}

export class PlainLayout extends React.Component {
  render() {
    return (
      <Layout className="plain layout">
        { this.props.children }
      </Layout>
    )
  }
}

export class MainLayout extends React.Component {
  
  render() {

    // console.log('this.props = ', this.props);
    // let {index} = this.props;
    let endpoint = this.props.location.pathname.split('/')[1];
    // console.log('endpoint = ', endpoint);

    return (
      <Layout className="main layout">
          <header>
            <div className="wrap">
              <h1>
                <a className="" href="#/">김진규블로그</a>
              </h1>
              <nav>
                <ul>
                  <li><a href="#/about" className={endpoint === null || endpoint === '' || endpoint === 'about' ? 'active' : ''}>About</a></li>
                  <li><a href="#/blog" className={endpoint === 'blog' ? 'active' : ''}>Blog</a></li>
                  <li><a href="#/gallery" className={endpoint === 'gallery' ? 'active' : ''}>Gallery</a></li>
                  <li><a href="#/tools" className={endpoint === 'tools' ? 'active' : ''}>Tools</a></li>
                </ul>
              </nav>
              <ul className="contacts">
                <li>
                  <a href="mailto:kimjk80.dev@gmail.com" target="_blank">
                    <Icon name="email" icon={ICONS['EMAIL']}/>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/RedPeanut/RedPeanut.github.io.src" target="_blank">
                    <Icon name="github" icon={ICONS['GITHUB']}/>
                  </a>
                </li>
              </ul>
            </div>
          </header>
          { this.props.children ? this.props.children : <About/> }
          <footer>
            <div className="wrap">
              <p>© 2021 by 김진규. All right reserved.</p>
            </div>
          </footer>
      </Layout>
    )
  }
}

export default MainLayout
