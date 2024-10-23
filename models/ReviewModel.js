const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema ({

    review_id : {
        type : String
    },

    places_id : {
        type : String
    },

    score : {
        type : String
    }

})

module.exports = mongoose.model.Review || mongoose.model('Review', ReviewSchema)