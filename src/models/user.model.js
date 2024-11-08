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
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    municipio: {
        type: String,
        required: true,
        trim: true,
    },
    codigo: {
        type: String,
        required: false, 
        trim: true,
    },
    codigoExpiracion: {
        type: Date,
        required: false, 
    },
    validated: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', userSchema)
