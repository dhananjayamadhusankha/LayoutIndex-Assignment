import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            ECommerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/admin/dashboard">
                  Dashboard
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">
                  Orders
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">
                  Messages
                </a>
              </li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              {/* <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/> */}
            </form>

            <li className="nav-item px-2">
              <a className="nav-link" href="#/" aria-disabled="true">
                <i className="fas fa-2x text-light fa-shopping-cart"></i>
                <span className="badge badge-warning badge-pill">0</span>
              </a>
            </li>

            <div className="text-end">
              <a href={"/customer/login"}>
                <button type="button" className="btn btn-outline-light me-2">
                  Login
                </button>
              </a>
              <a href={"/customer/signup"}>
                <button type="button" className="btn btn-primary">
                  Sign-up
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
