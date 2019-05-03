const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VendorlogsSchema = new Schema({

    vendor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Vendors'
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('vendorlogs', VendorlogsSchema);