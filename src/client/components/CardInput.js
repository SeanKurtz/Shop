import React from 'react';
import PropTypes from 'prop-types';

const CardInput = (props) => {
  const { updateItem, _id, handleUpdate } = props;
  return (
    <div className="card bg-light mb-3">
      <div className="card-header">
        Edit Item
      </div>
      <div className="card-body">
        <form onSubmit={updateItem} key={_id}>
          <div className="form-group">
            <label htmlFor="title" id="title-label">Title: </label>
            <input type="text" className="form-control" placeholder="Enter title" id="title" name="title" />
          </div>
          <div className="form-group">
            <label htmlFor="description" id="description-label">Description: </label>
            <input type="text" className="form-control" placeholder="Enter description" id="description" name="description" />
          </div>
          <div className="form-group">
            <label htmlFor="price" id="price-label">Price: </label>
            <input type="number" className="form-control" placeholder="Enter price" id="price" name="price" />
          </div>
          <button type="submit" className="btn btn-primary" value={_id} onClick={handleUpdate}>update</button>
        </form>
      </div>
    </div>
  );
};

CardInput.propTypes = {
  updateItem: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};
export default CardInput;
