const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// GET
const getAllMotorcycles = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("motorcycles").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// GET Specific Motorcycle
const getSingleMotorcycle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid motorcycleId to find a motorcycle.');
  }
  const motorcycleId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("motorcycles")
    .find({ _id: motorcycleId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// POST new Motorcycle
const createNewMotorcycle = async (req, res) => {
  try {
    const motorcycle = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        type: req.body.type,
      };

    console.log("Received motorcycle data:", motorcycle);

    // Assuming you have a MongoDB connection named 'mongodb'
    const response = await mongodb
      .getDb()
      .db()
      .collection("motorcycles")
      .insertOne(motorcycle);

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
    console.error("Error creating motorcycle:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT new info on a specific motorcycle
const updateMotorcycle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid motorcycleId to update a motorcycle.');
  }
  const motorcycleId = new ObjectId(req.params.id);
  const motorcycle = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        type: req.body.type,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("motorcycles")
    .replaceOne({ _id: motorcycleId }, motorcycle);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Update failed. Motorcycle not found or something went wrong..."
      );
  }
};


// DELETE a specific motorcycle
const deleteMotorcycle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid motorcycleId to delete a motorcycle.');
  }
  const motorcycleId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("motorcycles")
    .deleteOne({ _id: motorcycleId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Delete failed. Motorcycle not found or something went wrong..."
      );
  }
};

module.exports = {
  getAllMotorcycles,
  getSingleMotorcycle,
  createNewMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
};
