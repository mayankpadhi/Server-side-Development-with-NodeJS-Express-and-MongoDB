var express = require('express');
var promotionRouter  = express.Router();

var mongoose = require('mongoose');

var promotions = require('../models/promotions');

promotionRouter.route('/')
.get(function(req,res,next){

  promotions.find({}, function(err, promotion){
      if(err){
        throw err;
      }
      res.json(promotion);
  });

})

.post(function (req, res, next) {
    promotions.create(req.body, function (err, promotion) {
        if (err) throw err;
        console.log('promotion created!');
        var id = promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion with id: ' + id);
    });
})

.delete(function (req, res, next) {
    promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

promotionRouter.route('/:promotionId')

.get(function (req, res, next) {
    promotions.findById(req.params.promotionId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.put(function (req, res, next) {
    promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.delete(function (req, res, next) {
    promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promotionRouter;
