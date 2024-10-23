const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema ({

    report_id : {
        type : String
    },
    topic : {
        type : String
    },

    type : {
        type : String
    },

   img : {
       type : String
   },

    description : {
        type : String
    },

    status : {
        type : String
    }
    
})

module.exports = mongoose.model.Report || mongoose.model('Report', ReportSchema)