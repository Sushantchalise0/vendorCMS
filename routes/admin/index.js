const express = require('express');
const router = express.Router();
const {userAuth} = require('../../helpers/authen');


router.all('/*', userAuth, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {

    res.render('admin/index');
    // WalkmanUsers.count({}).then(walkmanCount => {
    //             Blog.count({}).then(blogCount => {
    //                 Coupons.count({}).then(couponCount => {
    //                 Products.count({}).then(productCount => {
    //                     Vendor.count({}).then(vendorCount => {
    //                         Coupons.find({v_status:"true"}).count({}).then(redeemedCount => {
    //                     res.render('admin/index', { walkmanCount: walkmanCount, blogCount:blogCount,couponCount:couponCount, productCount:productCount, vendorCount:vendorCount,redeemedCount:redeemedCount});
    //                 }); });
    //             });
    //              });
    //             });
    //         });
        });


module.exports = router;