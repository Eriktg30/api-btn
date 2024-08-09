import mongoose from "mongoose";

const emergenciasSchema = mongoose.Schema({
    ulongitud:{
        type: Number,
        required: true,
        trim: true,
    },
    ulatitud:{
        type: Number,
        required: true,
        trim: true,
    },
    estado:{
        type: String,
        required: true,
        trim: true,
    },
    tipo:{
        type: String,
        required: true,
        trim: true,
    },
    municipio:{
        type: String,
        required: true,
        trim: true,
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Policias:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policia'
    }

}, {
    timestamps: true
})

export default mongoose.model('Emergencia', emergenciasSchema)
