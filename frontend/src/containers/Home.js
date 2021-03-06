import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Home({ isAuthenticated }) {
  return (
    <div className="container mt-5">
      <div className="bg-light p-3 p-lg-5">
        <h1 className="display-4">Welcome to Notes</h1>
        <p className="lead">Developed with React and Django</p>
        <hr className="my-4" />
        {isAuthenticated ? (
          <>
            <p>Click the button below to go to dashboard</p>
            <Link to="/dashboard/0" className="btn btn-primary btn-lg">
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
