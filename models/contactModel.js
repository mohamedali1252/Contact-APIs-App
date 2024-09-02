const mongoose = require('mongoose');


const contactsSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true,'Please enter a name address'],
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true,'Please enter a valid phone number'],
        trim: true
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Contact', contactsSchema);