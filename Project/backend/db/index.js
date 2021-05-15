const mongoose = require('mongoose');

// const MongoClient = require('mongodb').MongoClient;


const URI = "mongodb+srv://Nassiba:nasiba20@cluster0.uzs9h.gcp.mongodb.net/medbotdb?retryWrites=true&w=majority";


module.exports = function() {
    mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => console.log(`Connected to DB`));
}



// MongoClient.connect(URI, function(err, client) {
//     if(err) {
//          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//     }
//     console.log('Connected...');
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//  });