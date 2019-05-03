const express = require('express');
const router = express.Router();
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const fs = require('fs');
const Vendorlog = require('../../models/Vendorlogs');
const Vendor = require('../../models/Vendors');



router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next(); 
});

//READ DATA

router.get('/', (req, res) => {

    Vendorlog.find({})
    .populate('vendor_id')
    .then(vendorlog => {
        res.render('admin/settings', {vendorlog: vendorlog});
    
    });  
});

//GO TO EDIT
router.get('/edit/:id', (req, res) => {

    Vendorlog.findOne({_id: req.params.id}).then(vendorlog => {
        Vendor.find({}).then(vendors => {
            res.render('admin/settings/edit', {vendorlog: vendorlog, vendors: vendors}); 
        });

    }); 
});

module.exports = router;