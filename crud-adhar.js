const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define the port
app.listen(8020, () => {
  console.log(`Server started on port: 8020`);
});

// Establish the mongodb connection using Promise
mongoose.connect("mongodb://localhost:27017/adhar_database")
.then(()=>{ 
    console.log("Connection is successful"); 
}).catch( (error) =>{
    console.log("Failed to establish with error: ", error);
});

// Defining Schema
const adharSchema = new mongoose.Schema({
    adharNo: { type: Number },
    fullName: {type: String },
    isMarried: {type: Boolean},
    city: { type: String },
    pin: {type: Number},
    country: { type: String }
},
{ collection: "adhar_collection" }
);
// Create the Model - Adhar
const adhar = mongoose.model("Adhar", adharSchema);
  
app.get('/allAdharDatabase', async (request, response) => { 
    console.log("Fetching Adhar_data from mongodb... ");
    console.log(`Request path: ${request.url}`);
    const adharList = await adhar.find({});
    return response.status(200).json(adharList);
});