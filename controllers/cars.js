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

// GET Specific Car
const getSingleCar = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid carId to find a car.');
  }
  const carId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("cars")
    .find({ _id: carId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// POST new Car
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

    console.log("Received car data:", car);

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
    console.error("Error creating car:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT new info on a specific car
const updateCar = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid carId to update a car.');
  }
  const carId = new ObjectId(req.params.id);
  const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        fuelType: req.body.fuelType,
        mileage: req.body.mileage,
        features: req.body.features || [] // features is an array; 
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("cars")
    .replaceOne({ _id: carId }, car);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Update failed. Car not found or something went wrong..."
      );
  }
};


// DELETE a specific car
const deleteCar = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid carId to delete a car.');
  }
  const carId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("cars")
    .deleteOne({ _id: carId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Delete failed. Car not found or something went wrong..."
      );
  }
};

module.exports = {
  getAllCars,
  getSingleCar,
  createNewCar,
  updateCar,
  deleteCar,
};
