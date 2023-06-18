import React from 'react'
import moment from 'moment'
// import Helmet from "react-helmet"
// import ReadNext from '../components/ReadNext'

class MarkdownWrapper extends React.Component {

  componentDidMount() {
    const post = document.querySelector(".post .content");
    const headings = Array.from(
      post.querySelectorAll("h1,h2,h3,h4,h5,h6")
    ).filter(h => h.id);
    const toc = document.querySelector(".post.toc");
    //new ScrollSpy(toc, headings);
  }

  render () {
    // console.log('render() is called...');
    const { route } = this.props
    // console.log('this.props = ', this.props);
    const post = route.page.data
    // console.log('post = ', post);
    const { title, insert, body, tableOfContents } = post

    return (
      // <MainLayout index={markdownRemark.frontmatter.category == 'gallery' ? 2 : 1}>
        <div className="blog read">
          <div className="wrap">
            <div className="left category list"></div>
            {
              tableOfContents ? 
              <div className="toc">
                <h2>Table of Contents</h2>
                <div className=""
                  dangerouslySetInnerHTML={{ __html: tableOfContents }}
                />
              </div> : ''
            }
            <div className="post">
              <h1 className="title">{title}</h1>
              {/* <p className="meta">{date} • {timeToRead}분</p> */}
              <p className="meta">{moment.utc(insert).format('YYYY년 MM월 DD일')}</p>
              <div className="content markdown-body"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          </div>
        </div>
      // </MainLayout>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
