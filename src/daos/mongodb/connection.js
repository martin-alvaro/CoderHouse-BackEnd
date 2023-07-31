import mongoose from "mongoose";

const connectionString = 'mongodb+srv://Martin3175:Huevo3175@cluster0.ncltubd.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {   
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB!!');
} catch (error) {
    console.log(error);
}
