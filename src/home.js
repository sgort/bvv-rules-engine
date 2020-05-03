import React, { Component } from "react";


class Home extends Component {

  render() {
    return (
      <div className="Home">
        <h2>Explain objective here...</h2>
        <p></p>
        <p>
          <img src={require('./images/rulescloud.png')} />
        </p>
      </div>
    )
  }
}

export default Home;