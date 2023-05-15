import React from 'react'
import moment from 'moment'
// import { Link } from 'gatsby'

// interface Fields {
//   slug: string
// }

// interface Frontmatter {
//   title: string
//   description: string
//   tags?: string[]
//   category?: string
//   link?: string
// }

// interface Page {
//   id: string
//   html: string
//   excerpt: string
//   fields: Fields
//   data: Frontmatter
// }

// interface PostListItemProps {
//   page: Page
// }

function PostListItem({
  page
}) {

  if(page.data.link != null && page.data.link != "") {
    return (
      <li className="item">
        <a href={page.data.link} className="" target="_blank">
          <h2 className="title">{page.data.title}
            <span className="newwindow"></span>
          </h2>
          <p className="timestamp">{moment(page.data.insert).format('YYYY년 MM월 DD일')}</p>
        </a>
      </li>
    )
  } else {
    return (
      <li className="item">
        <a href={'#/'+page.path} className="">
          <h2 className="title">{page.data.title}</h2>
          <p className="timestamp">{moment(page.data.insert).format('YYYY년 MM월 DD일')}</p>
          {/* <p className="meta"></p> */}
          {
            page.data.excerpt && (
              <p className="summary">
                {page.data.excerpt}
              </p>
            )
          }
        </a>
      </li>
    )
  }
}

export default PostListItem
