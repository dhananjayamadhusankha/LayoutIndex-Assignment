import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import app from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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

const EditProducts = () => {
  const { id } = useParams();

  const [mainCatagory, setmainCatagory] = useState("");
  const [subCatagory, setsubCatagory] = useState("");
  const [productName, setproductName] = useState("");
  const [topic, settopic] = useState("");
  const [quantity, setquantity] = useState(0);
  const [description, setdescription] = useState("");
  const [availability, setavailability] = useState("");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      const products = await axios
        .get(`http://localhost:8070/product/display/${id}`)
        .then((response) => {
          return response.data.products;
        })
        .catch((error) => {
          console.log(error);
        });

      setproductName(products.productName);
      settopic(products.topic);
      setmainCatagory(products.mainCatagory);
      setsubCatagory(products.subCatagory);
      setquantity(products.quantity);
      setdescription(products.description);
    };
    getProduct();
  }, []);

  const productUpdate = (e) => {
    e.preventDefault();

    var fileName = new Date().getTime().toString() + image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);
    //Upload the file to Firebase Storage
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " % done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((image) => {
          console.log("File available at :", image);

          const data = {
            mainCatagory,
            subCatagory,
            productName,
            topic,
            quantity,
            description,
            availability,
            price,
            image,
          };
          console.log(data);

          axios
            .put(`http://localhost:8070/product/update/${id}`, data)
            .then((res) => {
              alert("Successfully");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  };

  return (
    <div align="center">
      <div className="card shadow rounded mb-8 w-50 bg-white">
        <div className="card-header py-3 ">
          <div className="card-header text-dark bg-warning">
            <h3 className="font-weight-bold">Update Product</h3>
          </div>
          <br />

          <form className="row g-3">
            <div className="mb-3">
              <label
                style={{ marginBottom: "5px" }}
                className="form-label"
                required="required"
              >
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                name="productName"
                placeholder="Enter Product Name"
                required="required"
                onChange={(e) => {
                  setproductName(e.target.value);
                }}
                value={productName}
              />
            </div>

            <div className="mb-3">
              <label style={{ marginBottom: "5px" }} className="form-label">
                Topic
              </label>
              <input
                type="text"
                className="form-control"
                name="topic"
                placeholder="Enter Original Title"
                onChange={(e) => {
                  settopic(e.target.value);
                }}
                value={topic}
              />
            </div>

            <div className="col-md-6">
              <label style={{ marginBottom: "5px" }} className="form-label">
                Quantity{" "}
              </label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Enter Quantity"
                required="required"
                onChange={(e) => {
                  setquantity(parseInt(e.target.value));
                }}
                value={quantity}
              />
            </div>

            <div className="col-md-6">
              <label
                style={{ marginBottom: "5px" }}
                className="form-label"
                required="required"
              >
                Price
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Enter Product Price"
                required="required"
                onChange={(e) => {
                  setprice(parseInt(e.target.value));
                }}
                value={quantity}
              />
            </div>

            <div className="col-md-6">
              <label style={{ marginBottom: "5px" }} className="form-label">
                Availability
              </label>
              <select
                className="form-control"
                name="availability"
                maxLength="1000"
                required
                onChange={(e) => {
                  setavailability(e.target.value);
                }}
                value={availability}
              >
                <option value="">Enter Availability</option>
                <option value="yes">In Stock</option>
                <option value="no">Out Of Stock</option>
              </select>
            </div>

            <div className="col-md-6">
              <label style={{ marginBottom: "5px" }} className="form-label">
                Main Category
              </label>
              <select
                className="form-control"
                name="mainCatagory"
                placeholder="Enter Product Category"
                required
                onChange={(e) => {
                  setmainCatagory(e.target.value);
                }}
                value={mainCatagory}
              >
                <option value="">Select Main Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            {mainCatagory ? (
              <div className="col-md-6">
                <label style={{ marginBottom: "5px" }} className="form-label">
                  Sub Category
                </label>
                <select
                  className="form-control"
                  name="subCatagory"
                  placeholder="Enter Product Category"
                  required
                  onChange={(e) => {
                    setsubCatagory(e.target.value);
                  }}
                  value={subCatagory}
                >
                  <option value="">Select Sub Category</option>
                  {mainCatagory == "Men"
                    ? men.map((n) => <option value={n.value}>{n.label}</option>)
                    : mainCatagory == "Women"
                    ? women.map((w) => (
                        <option value={w.value}>{w.label}</option>
                      ))
                    : ""}
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="mb-3">
              <label style={{ marginBottom: "5px" }} className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter Description"
                maxLength="1000"
                required
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                value={description}
              />
            </div>

            <input
              textAlign={"center"}
              type="file"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
            />

            <input
              type="submit"
              value="Update"
              className="btn btn-danger"
              style={{
                marginBottom: "5px",
              }}
              onClick={productUpdate}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
