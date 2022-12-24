import React, { Component } from "react";
import axios from "axios";
import "../css/ProductDetails.css";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
    };
  }

  componentDidMount() {
    console.log(this.state.products);

    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/product/display/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          products: res.data.products,
        });

        console.log(this.state.products);
      }
    });
  }

  render() {
    const {
      productName,
      description,
      productCategory,
      availability,
      price,
      image,
    } = this.state.products;

    return (
      <div className="container">
        <div className="product-content product-wrap clearfix product-deatil">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-image">
                <div id="myCarousel-2" className="carousel slide">
                  <ol className="carousel-indicators">
                    <li
                      data-target="#myCarousel-2"
                      data-slide-to="0"
                      className=""
                    ></li>
                    <li
                      data-target="#myCarousel-2"
                      data-slide-to="1"
                      className="active"
                    ></li>
                    <li
                      data-target="#myCarousel-2"
                      data-slide-to="2"
                      className=""
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    {/* <!-- Slide 1 --> */}
                    <div className="item active">
                      <img src={image} className="img-responsive" alt="" />
                    </div>
                  </div>
                  <a
                    className="left carousel-control"
                    href="#myCarousel-2"
                    data-slide="prev"
                  >
                    {" "}
                    <span className="glyphicon glyphicon-chevron-left"></span>{" "}
                  </a>
                  <a
                    className="right carousel-control"
                    href="#myCarousel-2"
                    data-slide="next"
                  >
                    {" "}
                    <span className="glyphicon glyphicon-chevron-right"></span>{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
              <h1 className="name">{productName}</h1>
              <h4>{productCategory}</h4>
              <i className="fa fa-star fa-2x text-primary"></i>
              <i className="fa fa-star fa-2x text-primary"></i>
              <i className="fa fa-star fa-2x text-primary"></i>
              <i className="fa fa-star fa-2x text-primary"></i>
              <i className="fa fa-star fa-2x text-muted"></i>
              <span className="fa fa-2x">
                <h5>(109) Votes</h5>
              </span>
              <a href="#/">109 customer reviews</a>

              <hr />
              <table>
                <thead>
                  <tr>
                    <th>
                      <h1>
                        <span class="badge bg-danger">Rs. {price}</span>
                      </h1>
                    </th>
                    <th>
                      <small>*includes tax</small>
                    </th>
                  </tr>
                </thead>
              </table>

              <div className="certified">
                <ul>
                  <li>
                    <a href="#/">
                      Delivery time<span>7 Working Days</span>
                    </a>
                  </li>
                  <li>
                    <a href="#/">
                      Certified<span>Quality Assured</span>
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="container">
                <div id="myTabContent" className="tab-content">
                  <strong>Description Title</strong>
                  <p>{description}</p>

                  <div className="tab-pane fade" id="specifications">
                    <br />
                    <dl className="">
                      <dt>Gravina</dt>
                      <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
                      <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                      <dd>Eget lacinia odio sem nec elit.</dd>
                      <br />

                      <dt>Test lists</dt>
                      <dd>A description list is perfect for defining terms.</dd>
                      <br />

                      <dt>Altra porta</dt>
                      <dd>Vestibulum id ligula porta felis euismod semper</dd>
                    </dl>
                  </div>
                  <div className="tab-pane fade" id="reviews">
                    <br />
                    <form
                      method="post"
                      className="well padding-bottom-10"
                      onsubmit="return false;"
                    >
                      <textarea
                        rows="2"
                        className="form-control"
                        placeholder="Write a review"
                      ></textarea>
                      <div className="margin-top-10">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary pull-right"
                        >
                          Submit Review
                        </button>
                        <a
                          href="#/"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add Location"
                        >
                          <i className="fa fa-location-arrow"></i>
                        </a>
                        <a
                          href="#/"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add Voice"
                        >
                          <i className="fa fa-microphone"></i>
                        </a>
                        <a
                          href="#/"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add Photo"
                        >
                          <i className="fa fa-camera"></i>
                        </a>
                        <a
                          href="#/"
                          className="btn btn-link profile-link-btn"
                          rel="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Add File"
                        >
                          <i className="fa fa-file"></i>
                        </a>
                      </div>
                    </form>

                    <div className="chat-body no-padding profile-message">
                      <ul>
                        <li className="message">
                          <span className="message-text">
                            <a href="#/" className="username">
                              Alisha Molly
                              <span className="badge">Purchase Verified</span>
                              <span className="pull-right">
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-muted"></i>
                              </span>
                            </a>
                            Can't divide were divide fish forth fish to. Was
                            can't form the, living life grass darkness very
                            image let unto fowl isn't in blessed fill life
                            yielding above all moved
                          </span>
                          <ul className="list-inline font-xs">
                            <li>
                              <a href="#/" className="text-info">
                                <i className="fa fa-thumbs-up"></i> This was
                                helpful (22)
                              </a>
                            </li>
                            <li className="pull-right">
                              <small className="text-muted pull-right ultra-light">
                                {" "}
                                Posted 1 year ago{" "}
                              </small>
                            </li>
                          </ul>
                        </li>
                        <li className="message">
                          <span className="message-text">
                            <a href="#/" className="username">
                              Aragon Zarko
                              <span className="badge">Purchase Verified</span>
                              <span className="pull-right">
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                              </span>
                            </a>
                            Excellent product, love it!
                          </span>
                          <ul className="list-inline font-xs">
                            <li>
                              <a href="#/" className="text-info">
                                <i className="fa fa-thumbs-up"></i> This was
                                helpful (22)
                              </a>
                            </li>
                            <li className="pull-right">
                              <small className="text-muted pull-right ultra-light">
                                {" "}
                                Posted 1 year ago{" "}
                              </small>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <a href="#/" className="btn btn-warning btn-lg fw-bold">
                    Add to cart (Rs. {price})
                  </a>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="btn-group pull-right">
                    <button className="btn btn-secondary btn-lg">
                      <i className="fa fa-star"></i> Add to wishlist
                    </button>
                    <button className="btn btn-secondary btn-lg">
                      <i className="fa fa-envelope"></i> Contact Seller
                    </button>
                  </div>
                </div>
                <div className="container">
                  <h3>
                    <span class="badge bg-success">{availability}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
