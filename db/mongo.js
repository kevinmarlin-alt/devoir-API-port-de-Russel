const mongoose = require('mongoose');

const clientOptions = {
    //useNewUrlParser: true,
    dbName: "apinode",
    tls: true,
    ssl: true,
    retryWrites: true,
    w: 'majority'
}

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://renderapp2:MotDePasseFacile123@cluster0.yhlexfo.mongodb.net/apinode?appName=Cluster0", clientOptions)
        console.log('Connected')

    } catch (error) {
        console.log(error)
        throw error
    }
}