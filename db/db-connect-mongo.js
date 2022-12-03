const mongoose = require('mongoose');
require('dotenv').config();

const getConnection = async () => {
    try {
        const url = 'mongodb://'+process.env.USER+':'+process.env.PASSWORD+'@ac-0rwvkwj-shard-00-00.blijxfr.mongodb.net:27017,ac-0rwvkwj-shard-00-01.blijxfr.mongodb.net:27017,ac-0rwvkwj-shard-00-02.blijxfr.mongodb.net:27017/marcadoresdeportivos?ssl=true&replicaSet=atlas-762gdn-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);

        console.log("Conexion Exitosa");

    } catch (error) {
        console.log(error);
    }
}


module.exports = { getConnection }