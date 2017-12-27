import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../Partial/Loading'
import Postitem from './Postitem'

class PostList extends Component {
  render() {
    if (!this.props.postQuery) return ''
    if (this.props.postQuery.loading) {
      return (
        <section className="posts">
          <Loading />
        </section>
      )
    }
    return (
      <section className="posts">
        {this.props.postQuery.postcate && this.props.postQuery.postcate.posts && this.props.postQuery.postcate.posts.length ? (
            <ul className="postlist">
              {
                this.props.postQuery.postcate.posts.map((item, index) => {
                  return (
                    <li key={index}>
                      <Postitem data={item}></Postitem>
                    </li>
                  )
                })
              }
            </ul>
          ) : (
            <p className="nomore">没有文章</p>
        )}
      </section>
    );
  }
}

const POST_QUERY = gql`
  query posts($id: Int!) {
    postcate (id: $id) {
      id,
      title,
      description,
      posts {
        id,
        title,
        author,
        cate,
        excerpt,
        source,
        featured_img,
        thumb_up,
        thumb_down,
        createdAt,
        updatedAt
      }
    }
  }
`

export default graphql(POST_QUERY, {
  name: 'postQuery',
  options: (ownProps) => ({
    fetchPolicy: 'network-only',
    variables: { id: ownProps.cate }
  })
})(PostList)
