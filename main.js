let mysql = require ('mysql2')
const express = require ('express');
const { Server } = require('http');
const app = express()
app.use(express.json())



const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password :'Nathandata',
    database : 'Empolyess'
})


connection.connect((err) => {
    if (err){
        console.log(err);
    }
    else{
        console.log('connected');
    }
    })

    app.post('/post', (req, res)=>{
        const {id, name, employee_code, salary} = req.body
    
        if ( !name || !employee_code ||  !salary){
            return res.json('Enter valid details')
        }
    
        connection.promise().query('insert into empolyee_details values (?,?,?,?)', [id,name,employee_code,salary])
        .then(data => res.status(200).send(data[0]))
        .catch(err => console.log(err))
    })

app.get('/get', (req,res) =>{
    connection.promise().query('SELECT * FROM empolyee_details')
    .then(data => res.send(data[0]))
    .catch(err => console.log(err))

    })

    app.listen(3002)
    console.log('server is running on port 3002')


    // async function connect() {

//     try {
//         const connection = await mysql.createConnection(
//           'mysql://root:Nathandata@localhost:3306/Empolyess'
//         );

//         console.log("connected to the db")
//       } catch (err) {
//         console.log(err);
//       }

// }

// connect();