/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import CardInput from './CardInput';

class ItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], editable: false, time: Date.now() };
    this.getItems = this.getItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount() {
    this.getItems();
    this.interval = setInterval(() => this.getItems(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getItems() {
    axios.get('/api/items', { crossdomain: true })
      .then((response) => {
        this.setState({ items: response.data });
      });
  }

  updateItem(event) {
    event.preventDefault();
    const title = event.target[0].value;
    const description = event.target[1].value;
    const price = event.target[2].value;
    const id = event.target[3].value;
    axios.put(`/api/items/${id}`, { title, description, price })
      .then((res) => {
        console.log(res.data);
        this.getItems();
      });
  }

  deleteItem(event) {
    console.log(`attempting to delete item: ${event.target.value}`);
    const { items } = this.state;
    const id = event.target.value;

    // Request deletion.
    axios.delete(`/api/items/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ items: res.data });
      });
  }


  render() {
    const { items, editable } = this.state;
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
              editable={editable}
              getItems={this.getItems}
              setEditable={this.setEditable}
              deleteItem={this.deleteItem}
              updateItem={this.updateItem}
            />
          ))}

        </div>
      </div>
    );
  }
}


export default ItemGrid;
