import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../../Partial/Loading'

class Posts extends Component {
  render() {
    const { loading, post } = this.props.postQuery;
    if (!this.props.postQuery) return ''
    if (loading) {
      return (
        <section className="posts">
          <Loading />
        </section>
      )
    }
    return (
      <div className="main article">
        <section className="post">
          {post ? (
              <React.Fragment>
                <header className="post_header">
                  <h2>{post.title}</h2>
                  <div className="post_meta">
                    <p>文章来源:{post.source}</p>
                    <p>发布时间:{post.createdAt}</p>
                  </div>
                </header>
                {post.featured_img ? <section className="post_featuredimg"><img src={post.featured_img} /></section> : ''}
                <div className="content" dangerouslySetInnerHTML={{__html: post.content}}></div>
              </React.Fragment>
            ) : (
              <p className="nomore">找不到文章</p>
          )}
        </section>
      </div>
    );
  }
}

const POST_QUERY = gql`
  query post($id: Int!) {
    post (id: $id) {
      id,
      title,
      author,
      cate,
      excerpt,
      content,
      source,
      featured_img,
      thumb_up,
      thumb_down,
      createdAt,
      updatedAt
    }
  }
`

export default graphql(POST_QUERY, {
  name: 'postQuery',
  options: (ownProps) => {
    return {
      fetchPolicy: 'network-only',
      variables: { id: ownProps.match.params.id }
    }
  }
})(Posts)
