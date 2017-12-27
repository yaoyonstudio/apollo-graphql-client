import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={require('../../img/loading.svg')} alt="正在加载中" />
      </div>
    );
  }
}

export default Loading
