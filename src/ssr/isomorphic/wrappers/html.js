/* @flow weak */
import React from 'react'
import PropTypes from 'prop-types'

const Html = props => {
  console.log('html.js is called...');
  const post = props.route.page.data
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

Html.propTypes = {
  route: PropTypes.shape({
    page: PropTypes.shape({
      data: PropTypes.object,
    }),
  }),
}

Html.defaultProps = {
  route: {
    page: {
      data: {},
    },
  },
}

export default Html
