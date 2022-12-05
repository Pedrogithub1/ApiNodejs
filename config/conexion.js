const mysql = require('mysql');
/*const conexion = mysql.createConnection({
    host: 'kinesiologist-db.cu0emtvjku58.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Delivery[]007',
    port: '3306',
    database: 'kinesiologist'
});
*/
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'kinesiologist'
});



conexion.connect((err)=>{
    if(err){
        console.log('Error in conection ' + err)
    }
    else{
        console.log('DB connected');
    }
})

module.exports = conexion;
/*var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "https://dynamodb.us-east-2.amazonaws.com/",
    "accessKeyId": "AKIAUC3P2SH7Z6QCGWM4",
    "secretAccessKey": "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"
};

AWS.config.update(awsConfig);

/*const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'kinesiologist'
});


conexion.connect((err)=>{
    if(err){
        console.log('Error in conection ' + err)
    }
    else{
        console.log('DB connected');
    }
})

module.exports = AWS;*/