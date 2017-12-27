import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../../Partial/Loading'
import Postitem from '../../Partial/Postitem'

class Posts extends Component {
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
      <div className="main article">
        <nav className="PostcatesNav">
          {this.props.cateQuery.postcates && this.props.cateQuery.postcates.length ? (
            <ul>
              {
                this.props.cateQuery.postcates.map((item, index) => {
                  return (
                    <li key={index} className={this.props.match.params.cate === item.id ? 'active' : ''}><NavLink exact to={"/posts/" + item.id}>{item.title}</NavLink></li>
                  )
                })
              }
            </ul>
            ) : (
              <p>没有分类</p>
            )}
        </nav>
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
      </div>
    );
  }
}

const CATE_QUERY = gql`
  query cates {
    postcates {
      id,
      title,
      description
    }
  }
`

const POST_QUERY = gql`
  query posts($cate: Int!) {
    postcate (id: $cate) {
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

export default compose(
  graphql(CATE_QUERY, {
    name: 'cateQuery',
    options: {
      fetchPolicy: 'network-only',
    }
  }),
  graphql(POST_QUERY, {
    name: 'postQuery',
    options: (ownProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: { cate: ownProps.match.params.cate }
      }
    }
  })
)(Posts)
