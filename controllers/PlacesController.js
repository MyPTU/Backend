const Places = require('../models/PlaceModel');
// const admin = require('firebase-admin');
const colletion = "devices";

var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myparktu-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.firestore();

// create place
exports.create = async (req, res) => {
    const newplace = new Places({
        place_id: req.body.place_id,
        name: req.body.name,
        latitude: req.body.latitude,
        longtitude: req.body.longtitude,
        status: req.body.status,
        quantity: req.body.quantity,
        type: req.body.type,
        description: req.body.description,
        review: req.body.review,
        img: req.body.img
    })
    console.log(`DATA FROM : /create \n ${newplace}`);
    newplace.save();
    res.status(201).json(newplace);
}

// get all place data
exports.findAll = async (req, res) => {
    Places.find((err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(`DATA FROM : /getAll \n ${data}`);
            res.status(200).json(data);
        }
    })
}

// get all for car
exports.findCar = async (req, res) => {
    Places.find({ type: { $in: ['car'] }}, (err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(`DATA FROM : /get/car \n ${data}`);
            res.status(200).json(data)
        }
    })

    const cars = await Places.find({ type: { $in: ['car'] } });
    console.log(cars)
    // try {
    //     // Get all documents under 'devices' collection
    //     const snapshot = await db.collection('devices').get();
    //     const entities = [];

    //     // Loop through all documents and filter by 'car' type
    //     snapshot.forEach((doc) => {
    //         const data = doc.data();
    //         if (data.type === 'car') {
    //             entities.push(data);
    //         }
    //     });

    //     // If there are no car records, return an error message
    //     if (entities.length === 0) {
    //         return res.status(404).json({ error: 'No cars found' });
    //     }

    //     // Log the first car's places_id for debugging
    //     console.log(entities[0].places_id);

    //     // Return the filtered car data
    //     res.status(200).json(entities);
    // } catch (err) {
    //     console.error('Error fetching car data:', err);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
};


// get all for motorcycle
exports.findMotorcycle = async (req, res) => {
    Places.find({ type: { $in: ['motorcycle'] } }, (err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(`DATA FROM : /get/mortocycle \n ${data}`);
            res.status(200).json(data)
        }
    })
}

// get all for bicycle
exports.findBicycle = async (req, res) => {
    Places.find({ type: 'bicycle' }, (err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(`DATA FROM : /get/bicycle \n ${data}`);
            res.status(200).json(data)
        }
    })
}

// get one by place_id
exports.findByplace_id = async (req, res) => {
    Places.findOne({ place_id: parseInt(req.params.place_id) }, (err, data) => {
        if (err) {
            return next(err)
        } else {
            console.log(`DATA FROM : /get/place_id \n ${data}`);
            res.status(200).json(data);
        }
    })
}

exports.update = async (req, res) => {
    const { id } = { report_id: req.params };
    await Report.updateOne({ id }, req.body);
    const updatedDoc = await Report.findOne(id);
    return res.status(200).json(updatedDoc);
}

// Patch update review
exports.review = async (req, res) => {
    const updates = req.body;

    if ({ place_id: req.params.place_id }) {
        Places.updateOne({ place_id: req.params.place_id }, { $set: updates })
            .then((result) => {
                console.log('Document updated!')
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ error: 'Cannot update the document.' })
            });
    } else {
        req.status(500).json({ error: 'Not a valid doc id.' })
    }
}

exports.delete = async (req, res) => {
    const { id } = { place_id: req.params };
    const deletedDog = await Places.deleteOne(id);
    return res.status(200).json(deletedDog);
}