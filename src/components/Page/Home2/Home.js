import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../../Partial/Loading'
import PostList from '../../Partial/PostList'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cate: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.location.key !== nextProps.location.key) {
    //   this.props.cateQuery.refetch()
    // }
    if (nextProps.cateQuery && nextProps.cateQuery.postcates && nextProps.cateQuery.postcates.length) {
      let initCateId = nextProps.cateQuery.postcates[0].id
      this.setState({
        cate: initCateId
      })
    }
  }

  loadPost(cateId) {
    if (!cateId) return
    this.setState({
      cate: cateId
    })
  }

  render() {
    if (this.props.cateQuery.loading) {
      return (
        <div className="main home">
          <Loading />
        </div>
      )
    }
    return (
      <div className="main home">
        <nav className="PostcatesNav">
          {this.props.cateQuery.postcates && this.props.cateQuery.postcates.length ? (
            <ul>
              {
                this.props.cateQuery.postcates.map((item, index) => {
                  return (
                    <li className={this.state.cate === item.id ? 'active' : ''} key={index} onClick={() => this.loadPost(item.id)}>{item.title}</li>
                  )
                })
              }
            </ul>
            ) : (
              <p>没有分类</p>
            )}
        </nav>
        <hr />
        <nav className="PostcatesNav">
          {this.props.cateQuery.postcates && this.props.cateQuery.postcates.length ? (
            <ul>
              {
                this.props.cateQuery.postcates.map((item, index) => {
                  return (
                    <li key={index}><NavLink className={this.props.match.params.cate === item.id ? 'active' : ''} exact to={"/posts/" + item.id}>{item.title}</NavLink></li>
                  )
                })
              }
            </ul>
            ) : (
              <p>没有分类</p>
            )}
        </nav>
        <section className="posts">
          <PostList cate={this.state.cate} />
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
export default graphql(CATE_QUERY, {
  name: 'cateQuery',
  options: {
    fetchPolicy: 'network-only',
  }
})(Home)
