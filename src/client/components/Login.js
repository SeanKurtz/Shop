/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  onSubmit, onChange
}) => (
  <div className="form-container">
    <form className="form-signin text-center" onSubmit={onSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div className="form-group">
        <label htmlFor="inputEmail" className="sr-only">Email address </label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={onChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={onChange} required />
      </div>
      <br />
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
);

const onSubmit = () => console.log('On submit stub');
const onChange = () => console.log('On change stub');
Login.defaultProps = {
  onSubmit,
  onChange,
};
Login.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};


export default Login;
