const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, 'Email / Username is required!'],
            validate: [validateEmail, 'Please Enter a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please Enter a valid email address']
        },
        password: {
            type: String,
            required: [true, 'Password is required!']
        },
        qualification: {
            type: String,
            required: [true, 'Qualification is required!'],
            minlength: [3, 'Qualification must be more than 3 characters']
        },
        city: {
            type: String,
            required: [true, 'City is required!'],
            minlength: [3, 'City must be more than 3 characters']
        },
        phone_number: {
            type: Number,
            required: [true, 'Phone Number is required!'],
            minlength: [10, 'Phone Number must be 10 Digit']
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', UserSchema)