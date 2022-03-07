const mongoose = require('mongoose')

const ImagesSchema = mongoose.Schema(
    {
        uploaded_by: {
            type: String,
            required: [true, 'Uploaded By is Required!']
        },
        image_path: {
            type: String,
            required: [true, 'Image Path is required!']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Images', ImagesSchema)