const mysql = require('mysql');
const connectionHost = { 
    host: 'localhost' , //env.port || 'localhost'
    port: 3306,
    user:'root',
    password:'root',
    database:'keener',
} ;
const connection = mysql.createConnection(connectionHost);
connection.connect((err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Conectou")
    } 

} )
