import mongoose from "mongoose";

const PoliciasSchema = mongoose.Schema({
    NombresPo: {
        type: String,
        required: true,
        trim: true,
    },
    CorreoPo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    PasswordPo: {
        type: String,
        required: true,
        trim: true,
    },
    notificationToken: {
        type: String,
        required: true
    },
    ulongitud: {
        type: Number,
        required: true
    },
    ulatitud: {
        type: Number,
        required: true
    },

}, {
    timestamps: true,
})

export default mongoose.model('Policia', PoliciasSchema)
