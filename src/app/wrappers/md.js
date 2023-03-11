import React from 'react'
import moment from 'moment'
// import Helmet from "react-helmet"
// import ReadNext from '../components/ReadNext'

class MarkdownWrapper extends React.Component {
  render () {

    const { route } = this.props
    console.log('this.props = ', this.props); // working?
    const post = route.page.data
    // console.log('post = ', post);
    const { title, date, body } = post

    return (
      // <MainLayout index={markdownRemark.frontmatter.category == 'gallery' ? 2 : 1}>
        <div className="blog">
          <div className="wrap">
            <div className="left category list"></div>
            <div className="main post read">
              <h1 className="title">{title}</h1>
              {/* <p className="meta">{date} • {timeToRead}분</p> */}
              <p className="meta">{moment(date).format('YYYY년 M월 D일')}</p>
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
