import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import CardInput from './CardInput';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    };
    this.setEditable = this.setEditable.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    // Delay this action one second
    this.handleUpdateDebounced = debounce(this.handleUpdateDebounced, 500);
  }

  setEditable() {
    const { editable } = this.state;
    this.setState({ editable: !editable });
  }

  handleUpdate(event) {
    this.handleUpdateDebounced(event);
  }

  handleUpdateDebounced(event) {
    this.setEditable();
  }

  render() {
    const {
      _id, title, description, price, deleteItem, updateItem
    } = this.props;
    const { editable } = this.state;
    if (editable) {
      return (
        <CardInput _id={_id} updateItem={updateItem} handleUpdate={this.handleUpdate} />
      );
    }
    return (
      <div className="card bg-light mb-3">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{_id}</h6>
          <p className="card-text">{description}</p>
          <p className="card-subtitle mb-2 text-muted">{price}</p>
          <div className="button-group">
            <button type="button" className="btn btn-danger" onClick={deleteItem} value={_id}>delete</button>
            <button type="button" className="btn btn-secondary" value={_id} onClick={this.setEditable}>edit</button>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default Card;
