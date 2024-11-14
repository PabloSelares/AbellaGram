const mongoose = require('mongoose');
const { Schema } = mongoose;


const photoSchema = new Schema({
    image: String,
    title: String,
    likes: [String],       
    comments: [String],    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',      
        required: true
    },
    userName: String
}, {
    timestamps: true 
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
