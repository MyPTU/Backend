const Review = require('../models/ReviewModel');

exports.create = async (req, res) => {
    const data = new Review({
        review_id : req.body.review_id,
        places_id : req.body.places_id ,
        score: req.body.score
    })
    data.save().then((result) => {
        res.status(201).send({
            message: "Review Created Successfully",
            result,
        });
    }).catch((error) => {
        res.status(500).send({
            message: "Error creating Review",
            error,
        });
    });
}

exports.findAll = async (req, res) => {
    Review.find((err, data) => {
        if (err) {
            return next(err)
            
        } else {
            console.log(`DATA FROM : /getAll \n ${data}`);
            res.json(data);
        }
    })
}

exports.findById = async (req, res) => {
    
    var data_now ;
    var result = 0;
    Review.find({ places_id: req.params.id}, (err, data) => {
        if (err) {
            return next(err)
        } else {
            
            data_now = data;
            console.log(data_now.length)
            for(i=0;i<data_now.length;i++){
                result =  result + parseInt(data_now[i].score)
            }
            result = (result/data_now.length).toFixed(1)
            console.log(result)
            res.status(200).json({
                
                places_id: req.params.id,

                score:result
            });
        }
    })
}