import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Myheader extends Component {
  render() {
    return (
      <header className="myheader">
        <h1>React GraphQL Blog</h1>
        <nav>
          <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink exact to="/article">Article</NavLink></li>
            <li><NavLink to="/posts/1">Posts</NavLink></li>
            <li><NavLink exact to="/about">About</NavLink></li>
            <li><NavLink exact to="/test">Test</NavLink></li>
          </ul>
        </nav>
      </header>
    );
  }
}
