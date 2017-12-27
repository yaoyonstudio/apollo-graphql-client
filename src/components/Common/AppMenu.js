import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AppMenu.css';

export default class AppMenu extends Component {
  render() {
    return (
      <nav className="AppMenu">
        <ul>
          <li><NavLink exact to="/">首页</NavLink></li>
          <li><NavLink exact to="/about">关于</NavLink></li>
          <li><NavLink exact to="/test">Test</NavLink></li>
        </ul>
      </nav>
    );
  }
}
