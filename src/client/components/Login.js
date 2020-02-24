/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  failed, signUp, onSubmit, onChange
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
      <div className="signup">
        <label className="signup-label">Sign up</label>
        <input className="signup-checkbox" type="checkbox" value="signup" checked={signUp} onChange={onChange} />
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      { failed && (
      <div className="alert alert-danger" role="alert">
        Sign in failed.
      </div>
      )}

    </form>
  </div>
);

const onSubmit = () => console.log('On submit stub');
const onChange = () => console.log('On change stub');
Login.defaultProps = {
  signUp: false,
  failed: false,
  onSubmit,
  onChange,
};
Login.propTypes = {
  signUp: PropTypes.bool,
  failed: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};


export default Login;
