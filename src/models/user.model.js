import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }, 
     phoneFamily: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    municipio: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', userSchema)
