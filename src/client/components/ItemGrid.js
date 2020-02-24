/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';

class ItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    axios.get('/api/items', { crossdomain: true })
      .then((response) => {
        this.setState({ items: response.data });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="container">
        <div className="card-columns">
          {items.map(item => (
            <Card
              key={item._id}
              _id={item._id}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default ItemGrid;
