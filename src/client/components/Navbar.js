import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar(props) {
  const { title, loggedIn } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to={loggedIn ? '/home' : '/login'}>{ title }</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon " />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={loggedIn ? '/home' : '/login'}>
              {loggedIn ? 'Home' : 'Login'}
              {' '}
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          {
            loggedIn && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">Settings</Link>
                </li>
              </Fragment>
            )
          }
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default Navbar;
