const Report = require('../models/ReportModel');

exports.create = async (req, res) => {
    const data = new Report({
        report_id : req.body.report_id,
        topic : req.body.topic,
        type : req.body.type,
        img: req.body.img,
        description : req.body.description,
        status : req.body.status
    })
    data.save().then((result) => {
        res.status(201).send({
            message: "Report Created Successfully",
            result,
        });
    }).catch((error) => {
        res.status(500).send({
            message: "Error creating Report",
            error,
        });
    });
}

exports.findAll = async (req, res) => {
    Report.find((err, data) => {
        if (err) {
            return next(err)
            
        } else {
            console.log(`DATA FROM : /getAll \n ${data}`);
            res.json(data);
        }
    })
}

exports.findByid = async (req, res) => {
    Report.findOne({ place_id: parseInt(req.params.place_id) }, (err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(`DATA FROM : /get/findbyid \n ${data}`);
            res.json(data);
        }
    })
}

exports.update = async (req, res) => {
    const { id } =  {report_id :req.params};
    await Report.updateOne({ id }, req.body);
    const updatedDoc = await Report.findOne(id);
    return res.status(200).json(updatedDoc);
}