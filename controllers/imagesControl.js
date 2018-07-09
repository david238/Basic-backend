const {Image} = require('../models/image');
const {mongoose} = require('../database/mongoose');


exports.get_all_images  = (req, res, next) => {
    // res.send('respond with a resource');
    Image.find().then((images) => {
      res.status(200).json({
        images: images
      });
    }, (error) => {
        res.status(400).send(err);
    });

  }

  exports.add_new_image = (req, res, next) => {

  console.log(req.file);
  var image = new Image ({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    productImage: req.file.path
  });

  image.save().then( (newimage) => {
    res.send(newimage);
  }, (error) => {
    res.status(400).send(error);
  });
}

exports.search_image_by_id = (req, res, next) => {
    Image.find({_id: req.params.imageid})
    .exec()
    .then( imagefound => {
        res.status(200).json(imagefound)
    })
    .catch( err => {
        console.log(err);
            res.status(500).json({
            error:err
        });
    });
}