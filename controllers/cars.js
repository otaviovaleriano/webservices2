const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// GET
const getAllCars = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("cars").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// const getSingle = async (req, res, next) => {
//   const userId = new ObjectId(req.params.id);
//   const result = await mongodb
//     .getDb()
//     .db()
//     .collection("cars")
//     .find({ _id: userId });
//   result.toArray().then((lists) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(lists[0]);
//   });
// };

// POST
const createNewCar = async (req, res) => {
  try {
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        fuelType: req.body.fuelType,
        mileage: req.body.mileage,
        features: req.body.features || [] // features is an array; 
      };

    console.log("Received contact data:", car);

    // Assuming you have a MongoDB connection named 'mongodb'
    const response = await mongodb
      .getDb()
      .db()
      .collection("cars")
      .insertOne(car);

    console.log("MongoDB insertion response:", response);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Create failed. Something went wrong..."
        );
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json("Internal server error");
  }
};

// const updateContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday,
//   };
//   const response = await mongodb
//     .getDb()
//     .db()
//     .collection("cars")
//     .replaceOne({ _id: userId }, contact);
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res
//       .status(500)
//       .json(
//         response.error || "Update failed. Contact not found or something went wrong..."
//       );
//   }
// };

// const deleteContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const response = await mongodb
//     .getDb()
//     .db()
//     .collection("cars")
//     .deleteOne({ _id: userId }, true);
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(200).send();
//   } else {
//     res
//       .status(500)
//       .json(
//         response.error || "Delete failed. Contact not found or something went wrong..."
//       );
//   }
// };

module.exports = {
  getAllCars,
//   getSingle,
  createNewCar,
//   updateContact,
//   deleteContact,
};
