import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const men = [
  {
    label: "Blazers",
    key: "blazers",
  },
  {
    label: "Sunglasses",
    key: "sunglasses",
  },
  {
    label: "Trouser",
    key: "trouser",
  },
];

const women = [
  {
    label: "Sweater",
    key: "sweater",
  },
  {
    label: "Dress",
    key: "dress",
  },
  {
    label: "TShirt",
    key: "tshirt",
  },
];

const Home = () => {
  const [sortedProducts, setsortedProducts] = useState([]);
  const [mainCatagory, setmainCatagory] = useState("");
  const [subCatagory, setsubCatagory] = useState("");

  const [products, setproducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8070/products/displayProducts").then((res) => {
      if (res.data.success) {
        setsortedProducts(res.data.existingProducts);
        setproducts(res.data.existingProducts);
      }
    });
  }, []);

  const sortByMainCategory = (e) => {
    setsubCatagory("");
    setmainCatagory(e);
    const sortedProducts = products.filter(
      (product) => product.mainCatagory == e
    );
    setsortedProducts(sortedProducts);
  };

  const sortBySubCategory = (e) => {
    setsubCatagory(e);
    const SortedProducts = products.filter(
      (product) =>
        product.subCatagory == e && product.mainCatagory == mainCatagory
    );
    setsortedProducts(SortedProducts);
  };

  console.log(sortedProducts);

  const sortByAvailability = (e) => {
    const sortedProducts = products.filter(
      (product) => product.availability == e
    );
    setsortedProducts(sortedProducts);
  };
  //   console.log(products);

  const onDelete = (id) => {
    if (window.confirm("Are you want to delete this product?"))
      axios.delete(`http://localhost:8070/product/delete/${id}`).then((res) => {
        toast.success("Product Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location = "/productList";
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h2 className="fw-bold">ALL PRODUCTS</h2>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <a href="/save">
            <button
              type="button"
              class="btn btn-success"
              style={{ marginBottom: "10px" }}
            >
              Create Product
            </button>
          </a>
        </div>
      </div>

      <div>
        <div className="col-lg-3 mt-2 mb-2">
          <form className="dropdwonForm">
            <label style={{ color: "black", fontWeight: 700 }}>
              Main Category :{" "}
            </label>
            <select
              className="btn btn-primary dropdown-toggle dropdown-toggle-split"
              onChange={(e) => {
                sortByMainCategory(e.target.value);
              }}
            >
              <option value="">Choose...</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </form>
        </div>
      </div>

      {mainCatagory ? (
        <div className="col-md-6">
          <label style={{ marginBottom: "5px" }} className="form-label">
            Sub Category
          </label>
          <select
            value={subCatagory}
            className="form-control"
            name="subCatagory"
            placeholder="Select Product Category"
            required
            onChange={(e) => {
              sortBySubCategory(e.target.value);
            }}
          >
            <option value="">Select Sub Category</option>
            {mainCatagory == "Men"
              ? men.map((n) => <option value={n.value}>{n.label}</option>)
              : mainCatagory == "Women"
              ? women.map((w) => <option value={w.value}>{w.label}</option>)
              : ""}
          </select>
        </div>
      ) : (
        ""
      )}
      <br />

      <font size="2">
        <table className="table">
          <thead>
            <tr bgcolor="#A0CFEC">
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Main Category</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Availability</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((products, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/display/${products._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {products.productName}
                  </a>
                </td>
                <td>{products.quantity}</td>
                <td>{products.mainCatagory}</td>
                <td>{products.subCatagory}</td>
                <td>{products.availability}</td>
                <td>{products.price}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/update/${products._id}`}
                  >
                    <i className="far fa-edit"></i>&nbsp;
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    onClick={() => onDelete(products._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </font>
    </div>
  );
};

export default Home;
