const validator = require('../helpers/validate');

const saveCar = (req, res, next) => {
    const validationRule = {
        brand: 'required|string',
        model: 'required|string',
        year: 'required|integer',
        color: 'required|string',
        fuelType: 'required|string',
        mileage: 'required|integer',
        features: 'array' // Ensure it is an array
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveCar
};
