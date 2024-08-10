import mongoose from "mongoose";

const municipiosSchema = mongoose.Schema({
    municipio: {
        type: String,
        require: true,
        unique: true
    }
})

export default mongoose.model('Municipios', municipiosSchema)
