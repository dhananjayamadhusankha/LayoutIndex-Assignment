import React, { useState } from "react";
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

const CreateProducts = () => {
  const [mainCatagory, setmainCatagory] = useState("");
  const [subCatagory, setsubCatagory] = useState("");
  const [productName, setproductName] = useState("");
  const [topic, settopic] = useState("");
  const [quantity, setquantity] = useState(0);
  const [description, setdescription] = useState("");
  const [availability, setavailability] = useState("");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");

  const onSubmit = (e) => {
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
            .post("http://localhost:8070/products/save", data)
            .then((res) => {
              alert("Successfully");
              window.location.reload();
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
            <h3 className="font-weight-bold">Create New Product</h3>
          </div>
          <br />

          <form className="row g-3" onSubmit={onSubmit}>
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
              >
                <option value="">Enter Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Out Of Stock">Out Of Stock</option>
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
                  placeholder="Select Product Category"
                  required
                  onChange={(e) => {
                    setsubCatagory(e.target.value);
                  }}
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
              />
            </div>

            <input
              type="file"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
            />

            {/* <div>
              <FileBase64 type="file" name="image" multiple={false} />
            </div> */}

            <input
              className="btn btn-danger font-weight-bold"
              type="submit"
              style={{ marginBottom: "5px" }}
              value="Save"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
