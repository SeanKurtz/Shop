import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const {
    _id, title, description, price
  } = props;
  return (
    <div className="card bg-light mb-3">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{_id}</h6>
        <p className="card-text">{description}</p>
        <p className="card-subtitle mb-2 text-muted">{price}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default Card;
