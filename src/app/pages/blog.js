import React from "react"
import { connect } from "react-redux"

import { MainLayout } from "../components/Layout"
import PostListItem from "../components/PostListItem"
import _ from 'lodash'

class Blog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    // console.log('this.props = ', this.props);
    const sortedPages = _.sortBy(this.props.route.pages, 'data.date').reverse();
    // console.log('this.props.route.path = ', this.props.route.path);
    const visiblePages = sortedPages.filter(page => (
      _.get(page, 'data.category') === this.props.route.path // blog or gallery
      && _.get(page, 'file.ext') === 'md' && !_.includes(page.path, '/404')
    ));
    // console.log('sortedPages = ', sortedPages);
    // console.log('visiblePages = ', visiblePages);

    return (
      // <MainLayout index={1}>
      <div className="blog">
        <div className="wrap">
          <div className="left category list"></div>
          <div className="main post list">
            <ul>
              {
                visiblePages.map((page, index) => {
                  return (
                    <PostListItem
                      key={index}
                      page={page}
                    />
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    // </MainLayout>
    )
  }
}

const mapStateToProps = (state) => {return {}}
const mapDispatchToProps = (dispatch) => {return {}}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
