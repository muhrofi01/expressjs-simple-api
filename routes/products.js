var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Product } = require('../models');

const v = new Validator();

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        brand: 'string',
        description: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    const product = await Product.create(req.body);

    res.json(product);
});

module.exports = router;