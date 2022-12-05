const router = require('express').Router()
const conexion = require('./config/conexion')

//Session
var sess = {
    id_user: '',
    name: '',
    password: '',
    loggedIn: false,
    type: '',
    email: ''
}


//Asigning all the routes

//get rvents
router.get('/checkDates:id:id_kine',(req, res)=>{
    const {id, id_kine}= req.params
    let sql = `SELECT * FROM tb_dates where id_patient = '${id}' and id_kinesiologist = '${id_kine}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            console.log(rows[0])
            res.json(rows[0])
        }
    })
})


//get rvents
router.get('/events',(req, res)=>{
    let sql = `SELECT * FROM tb_events`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get one event
router.get('/event:id',(req, res)=>{
    const {id} = req.params
    let sql = `SELECT * FROM tb_events WHERE id = '${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows[0])
        }
    })
})

//get tb_dates for kinesiologists
router.get('/kcalendar:id_user', (req, res)=>{
    const {id_user} = req.params
    let sql = `SELECT * FROM tb_dates WHERE id_kinesiologist = '${id_user}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get tb_dates for patients
router.get('/pcalendar:id_user', (req, res)=>{
    const {id_user} = req.params
    let sql = `SELECT * FROM tb_dates WHERE id_patient = '${id_user}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})


//get users
router.get('/', (req, res)=>{
    let sql ='SELECT * FROM tb_users'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
    
})

//get kinesiologists
router.get('/kinesiologists', (req, res)=>{
    let sql ='SELECT * FROM tb_kinesiologist'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
    
})

//get one kinesiologist
router.get('/kinesiologist:id', (req, res)=>{
    const {id} = req.params
    let sql ='SELECT * FROM tb_kinesiologist WHERE id_user = ? '
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.send(rows[0])
        }
    })
})


//get Patients
router.get('/patients', (req, res)=>{
    let sql ='SELECT * FROM tb_patients'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
    
})


//get one patient
router.get('/patient:id', (req, res)=>{
    const {id} = req.params
    let sql ='SELECT * FROM tb_patients WHERE id_user = ?'
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.send(rows[0])
        }
    })
})

//get tb_comments
router.get('/comments:id_post', (req, res)=>{
    const {id_post} = req.params
    let sql = `SELECT * FROM tb_comments WHERE id_post = '${id_post}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})



//get tb_posts
router.get('/post1', (req, res)=>{
    let sql ='SELECT * FROM tb_posts'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get id autoincrement
router.get('/iduser', (req, res)=>{
    let sql ="SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'kinesiologist' AND  TABLE_NAME  = 'tb_users';"
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows[0])
        }
    })
})



//get one user
router.get('/:id', (req, res)=>{
    const {id} = req.params
    let sql ='SELECT * FROM tb_users WHERE id_user = ?'
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows[0])
        }
    })
})

//Adding tb_kinesiologist
router.post('/kinesiologist', (req, res)=>{
    const {id_user, name, description, country, gender, age, direccion, latitud, longitud} = req.body
    let sql = `INSERT INTO tb_kinesiologist(id_user, name, description, country, gender, age, direccion, latitud, longitud) 
               VALUES ('${id_user}', '${name}', '${description}', '${country}','${gender}', '${age}', '${direccion}', '${latitud}', '${longitud}')`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'kinesiologist added'})
        }
    })

})


//Adding tb_posts
router.post('/post1', (req, res)=>{
    const {id_user, affair, msg, date, user_name, type, gender} = req.body
    let sql =  `INSERT INTO tb_posts(id_user, affair, msg, date, user_name, type, gender)
                VALUES ('${id_user}', '${affair}', '${msg}', '${date}', '${user_name}', '${type}', '${gender}'  )`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'post added'})
        }
    })
})

//Add comment
router.post('/comment', (req, res) =>{
    const {id_post, id_user, user_name, msg, date, type, gender} = req.body
    let sql = `INSERT INTO tb_comments(id_post, id_user, user_name, msg, date, type, gender)
                VALUES ('${id_post}', '${id_user}', '${user_name}', '${msg}', '${date}', '${type}', '${gender}' )`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'comment added'})
        }
    })
})


//Add user
router.post('/', (req, res)=>{
    const {user_name, email, password, type, gender} = req.body
    let sql = `INSERT INTO tb_users(user_name, email, password, type, gender) VALUES ('${user_name}', '${email}','${password}', '${type}', '${gender}')`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'User added'})
        }
    })

})

//Validate email to sign up
router.post('/validateEmail', (req, res)=>{
    const email = req.body.email
    let sql ="SELECT * FROM tb_users WHERE email = ?"
    conexion.query(sql,[email],(err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length == 0){
                res.json({valid: 'true'})
            }
            else{
                res.json({valid: 'false'})
            }
        }
    })
})


//Adding tb_patients
router.post('/patient', (req, res)=>{
    const {id_user, name, description, country, gender, age, direccion, latitud, longitud} = req.body
    let sql = `INSERT INTO tb_patients(id_user, name, description, country, gender, age, direccion, latitud, longitud) 
               VALUES ('${id_user}', '${name}', '${description}', '${country}', '${gender}', '${age}', '${direccion}', '${latitud}', '${longitud}')`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'patient added'})
        }
    })

})

//Adding tb_events
router.post('/addEvent', (req, res)=>{
    const {id_kine, name, gender, description, date, link, status} = req.body
    let sql = `INSERT INTO tb_events(id_kine, name, gender, description, date, link, status) 
               VALUES ('${id_kine}', '${name}', '${gender}', '${description}', '${date}', '${link}', '${status}')`
    
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'event added'})
        }
    })

})



//Signing in
router.post('/signIn', (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    if(email && password){
        conexion.query("SELECT * FROM tb_users WHERE email = ?",[email], (err, results) =>{
            if(err) throw err;
            if(results.length == 0 || password != results[0].password){
                res.send({sign: 'Fail'})
            }
            else{
                sess = req.session
                let number = results[0].id_user.toString()
                sess.id_user = results[0].id_user
                sess.name = results[0].user_name
                sess.password = results[0].password
                sess.loggedIn = true;
                sess.type = results[0].type
                sess.email = results[0].email
                sess.gender = results[0].gender
                res.send({sign: 'Succesful', id_user: sess.id_user, name: sess.name, password: sess.password, loggedIn: sess.loggedIn, type: sess.type, email: sess.email, gender: sess.gender})
            }
        })
    }
})

//Add date
router.post('/apply', (req, res) =>{
    const {id_patient, id_kinesiologist, pat_name, kin_name, gender, age, reason, date, place, status } = req.body
    let sql = `INSERT INTO tb_dates(id_patient, id_kinesiologist, pat_name, kin_name, gender, age, reason, date, place, status)
                VALUES ('${id_patient}', '${id_kinesiologist}', '${pat_name}', '${kin_name}', '${gender}', '${age}', '${reason}', '${date}', '${place}', '${status}' )`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'date added'})
        }
    })
})

//Change status from event table
router.put('/statusEvent:id', (req, res)=>{
    const {id} = req.params
    const {status} = req.body
    let sql = `UPDATE tb_events SET status = '${status}' WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'Status active'})
        }
    })
})


//edit user
router.put('/editEvent:id', (req,res)=>{
    const {id} = req.params
    const {description, link, date} = req.body
    let sql = `UPDATE tb_events SET 
                description = '${description}',
                link = '${link}',
                date = '${date}'
                WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'Event edited'})
        }
    })

})

//edit date
router.put('/changeDate:id', (req, res)=>{
    const {id} = req.params
    const {date, status} = req.body

    let sql = `UPDATE tb_dates SET date = '${date}', status = '${status}' WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'Status active'})
        }
    })
})

router.put('/finished:id', (req, res)=>{
    const {id} = req.params
    let sql = `UPDATE tb_dates SET status = 'Finished' WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'Status active'})
        }
    })
})

router.put('/status:id', (req, res)=>{
    const {id} = req.params
    let sql = `UPDATE tb_dates SET status = 'Active' WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'Status active'})
        }
    })
})


//edit Users and Session
router.put('/edit:id', (req, res)=>{
    const {id} = req.params
    const {user_name, email, password, type, gender} = req.body
    let sql = `UPDATE tb_users SET 
            user_name = '${user_name}',
            email = '${email}',
            password = '${password}', 
            type = '${type}',
            gender = '${gender}'
            WHERE id_user = '${id}'`

    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            sess.id_user = id
            sess.name = user_name
            sess.password = password
            sess.type = type
            sess.email =  email
            res.send({edited: 'Succesful', id_user: sess.id_user, name: sess.name, password: sess.password, loggedIn: sess.loggedIn, type: sess.type, email: sess.email})
        }
    })
})


//edit Patient table
router.put('/patient:id', (req, res)=>{
    const {id} = req.params
    const {name, description, country, gender, age, direccion, latitud, longitud} = req.body
    let sql = `UPDATE tb_patients SET 
            name = '${name}',
            description = '${description}',
            country = '${country}', 
            gender = '${gender}',
            age = '${age}',
            direccion = '${direccion}',
            latitud = '${latitud}',
            longitud = '${longitud}'
            WHERE id_user = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.send({edited: 'Successful'})
        }
    })
})


//edit Kinesiologist table
router.put('/kinesiologist:id', (req, res)=>{
    const {id} = req.params
    const {name, description, country, age, gender, direccion, latitud, longitud} = req.body
    let sql = `UPDATE tb_kinesiologist SET 
            name = '${name}',
            description = '${description}',
            country = '${country}',
            age = '${age}',
            gender = '${gender}',
            direccion = '${direccion}',
            latitud = '${latitud}',
            longitud = '${longitud}'
            WHERE id_user = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.send({edited: 'Succesful'})
            
        }
    })
})

//edit user
router.put('/:id', (req,res)=>{
    const {id} = req.params
    const {user_name, email, password, type} = req.body
    let sql = `UPDATE tb_users SET 
                user_name = '${user_name}',
                email = '${email}',
                password = '${password}', 
                type = '${type}' 
                WHERE id_user = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'User edited'})
        }
    })

})

//Decline event
router.delete('/deleteEvent:id', (req, res)=>{
    const {id} = req.params
    let sql = `DELETE FROM tb_events WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'Status active'})
        }
    })
})

//Delete Comments
router.delete('/postDelete:id', (req,res)=>{
    const {id} = req.params
    let sql = `DELETE FROM tb_posts WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'Comments deleted'})
        }
    })
})

//Delete Comments
router.delete('/commentsDelete:id', (req,res)=>{
    const {id} = req.params
    let sql = `DELETE FROM tb_comments WHERE id_post = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'Comments deleted'})
        }
    })
})

//Decline date
router.delete('/decline:id', (req, res)=>{
    const {id} = req.params
    let sql = `DELETE FROM tb_dates WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if(err) throw err;
        else{
            res.json({status: 'Status active'})
        }
    })
})



//Delete Patient
router.delete('/patient:id', (req,res)=>{
    const {id} = req.params
    console.log(id)
    let sql = `DELETE FROM tb_patients WHERE id_user = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'Patient deleted'})
        }
    })
})


//Delete Kinesiologist
router.delete('/kinesiologist:id', (req,res)=>{
    const {id} = req.params
    let sql = `DELETE FROM tb_kinesiologist WHERE id_user = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'Kinesiologist deleted'})
        }
    })
})


//Delete user
router.delete('/:id', (req,res)=>{
    const {id} = req.params
    let sql = `DELETE FROM tb_users WHERE id_user = '${id}'`
    conexion.query(sql, (err, rows, fields) =>{
        if(err) throw err;
        else{
            res.json({status: 'User deleted'})
        }
    })
})

module.exports = router;
/*const router = require('express').Router()
var AWS = require("aws-sdk");

const conexion = require('./config/conexion')
const session = require('express-session');
var nodemailer = require("nodemailer");

let docClient = new AWS.DynamoDB.DocumentClient();

*/