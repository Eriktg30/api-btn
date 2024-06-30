import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/CELI');
//         console.log('>>> DB is connected <<<');
//     } catch (error) {
//         console.log(error);
//     }
// };


// import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ctbase701:STWKDvxqfXjcUaF4@botonpanico.7cbcuti.mongodb.net/?retryWrites=true&w=majority&appName=BotonPanico")
        console.log('>>> DB is connected <<<');
    } catch (error) {
        console.log(error);
    }
};