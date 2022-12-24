import React, { Component } from "react";

export default class AdminDashboard extends Component {
  render() {
    return (
      <div>
        {/* <!-- Your Seller Account Starts --> */}
        <div class="container mt-5">
          <h2>Admin Account</h2>
          {/* <!-- Seller Account Panel Starts --> */}
          <div class="row">
            <div class="col-md-6">
              <a href="/save" class="btn w-100">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title">
                      <i class="fas fa-2x fa-cart-plus"></i>
                      <span class="h4"> Add New Product</span>
                    </div>
                    <small class="text-muted">
                      Create a new product to sell.
                    </small>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-md-6">
              <a href="/" class="btn w-100">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title">
                      <i class="fas fa-2x fa-list-ol"></i>
                      <span class="h4"> Product List</span>
                    </div>
                    <small class="text-muted">Check your all products</small>
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* <!-- Seller Account Panel Starts --> */}
        </div>
        {/* <!-- Your Seller Account Ends --> */}
      </div>
    );
  }
}
