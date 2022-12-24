const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

//add modleware
app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(cors());

const PORT = process.env.PORT || 8070;

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (() => {
    console.log('DB Connection Successfully..!');
})
.catch(err => console.log('DB Connection error: ' + err.message));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

//import routes
const productRoutes = require('./routes/DM_route/products');
const customerRoutes = require('./routes/OC_route/customer');

//routes
app.use(productRoutes);
app.use("/customer",customerRoutes);

// report generate routes
const productPDFRoutes = require ('./routes/DM_route/PDF_Generator/products_report');
app.use(productPDFRoutes);