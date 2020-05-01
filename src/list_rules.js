import React, { Component } from 'react';
import { createSorter } from './components/sort';

class ReadRulesEngine extends Component {
  state = {
    sorters: this.props.sorters
  };

  static defaultProps = {
    sorters: [{
      property: 'date_start',
      direction: 'DESC'
    }]
  };

  componentDidMount() {
    fetch('http://localhost:9000/rulesengine/')
      .then(res => res.json())
      .then(this.onLoad);
  }

  parseData(data) {
    const { sorters } = this.state;

    if (data && data.length) {
      if (Array.isArray(sorters) && sorters.length) {
        data.sort(createSorter(...sorters));
      }
    }

    return data;
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data.rules)
    });
  };

  render() {
    const { data } = this.state;

    return data ? this.renderData(data) : this.renderLoading();
  }


  renderData(data) {
    if (data && data.length > 0) {
      return (
        <div>
          <h1>Rules Engine config</h1>
          <p>Domain | Reference | Issuer | Date Start | Date End | Rules</p>
          {data.map(item => (
            <div key={item.id}>
              <p>{item.domain} | {item.reference} | {item.issuer} | {item.date_start} | ... | {item.rules}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No items found</div>;
    }
  }

  renderLoading() {
    return <div>Fetching records...</div>;
  }
}

export default ReadRulesEngine;