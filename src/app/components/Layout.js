import React, {} from "react"
import {Link} from "react-router";
import "../../www/css/style.css"
import Icon from "./Icon"
import ICONS from "../utils/icons"
import About from "../pages/about"
import Blog from "../pages/blog"

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

    console.log('this.props = ', this.props);
    // let {index} = this.props;
    let endpoint = this.props.location ? this.props.location.pathname.split('/')[1] : '404';
    // console.log('endpoint = ', endpoint);

    return (
      <Layout className="main layout">
          <header>
            <div className="wrap">
              <h1>
                {/* <a className="" href="#/">김진규블로그</a> */}
                <Link to="/" className="">김진규블로그</Link>
              </h1>
              <nav>
                <ul>
                  <li>
                    {/* <a href="#/blog" className={endpoint === 'blog' ? 'active' : ''}>Blog</a> */}
                    <Link to="/blog" className={endpoint === null || endpoint === '' || endpoint === 'blog' ? 'active' : ''}>Blog</Link>
                  </li>
                  <li>
                    {/* <a href="#/gallery" className={endpoint === 'gallery' ? 'active' : ''}>Gallery</a> */}
                    <Link to="/gallery" className={endpoint === 'gallery' ? 'active' : ''}>Gallery</Link>
                  </li>
                  <li>
                    {/* <a href="#/tools" className={endpoint === 'tools' ? 'active' : ''}>Tools</a> */}
                    <Link href="/tools" className={endpoint === 'tools' ? 'active' : ''}>Tools</Link>
                  </li>
                  <li>
                    {/* <a href="#/about" className={endpoint === null || endpoint === '' || endpoint === 'about' ? 'active' : ''}>About</a> */}
                    <Link to="/about" className={endpoint === 'about' ? 'active' : ''}>About</Link>
                  </li>
                </ul>
              </nav>
              <ul className="contacts">
                <li>
                  <a href="mailto:zamong99@gmail.com" target="_blank">
                    <Icon name="email" icon={ICONS['EMAIL']}/>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/RedPeanut/redpeanut.github.io.src" target="_blank">
                    <Icon name="github" icon={ICONS['GITHUB']}/>
                  </a>
                </li>
              </ul>
            </div>
          </header>
          { this.props.children ? this.props.children : <Blog route={this.props.route}/> }
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
