import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Home({ isAuthenticated }) {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to TODO App</h1>
        <p className="lead">Developed with React and Django</p>
        <hr className="my-4" />
        {isAuthenticated ? (
          <>
            <p>Click the button below to go to dashboard</p>
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <p>Click the button below to log in</p>
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);