import express from "express";
import mysql from "mysql2";
import cors from "cors";
import session from 'express-session';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const app = express();
//var a;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    methods: ['POST', 'GET'],
    origin: "http://localhost:3001"
}));
//app.use(bodyParser.json());
//--------------------------------------express-session----------------------------------------------

/*app.use(session(
    {
        
        secret:'secret@123',// secret is used to sign the session ID cookie,it is usually a string 
        saveUinitialized:true,// save the cookie withou verification
        resave:true,
        cookie:
        {
            name: 'connect.sid',
            path: '/',
            httpOnly:true,// https will get set by only using http request
            maxAge:3600000// milliseconds
        }

    }))*/

    app.use(session({
        secret:'secret@123',// secret is used to sign the session ID cookie,it is usually a string 
        saveUinitialized:false,// save the cookie withou verification
        resave:false,
        cookie:
        {
            secure: false,
            path: '/'
        }
    }))



//-----------------------------------------------------------------------------------------
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    port: 3304,
    database:"testing"
})

/*const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: 'root',
    password: 'root@123',
    port: 3304,
    database: "testing"
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Database connected successfully');
    connection.release();
});
*/
app.get("/", (req, res) => {
    return res.json("Hello")


    /*const q = "SELECT * FROM customer_details";
    db.query(q, (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });*/

    /*const n ='AKASH';//req.body.user_name;
    const p = '2004976';//req.body.password
    const q = "SELECT * FROM login_detail WHERE user_name=? and password=?";

    db.query(q,[n,p],(err, data) => {
        if (err)
            return res.json(err);
        console.log(data[0].id)
        //req.session.user_id = "gh";
        return res.json(data[0].user_name);
    });*/
    
    /*{
        const n ='AKASH';
        const p = '2004976'
        const q = "SELECT * FROM login_detail WHERE user_name= ? and password = ? ";

    db.query(q,[n,p],(err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });*/

    /*
    const q = "SELECT * FROM login_detail WHERE user_name= 'AKASK' and password = '2004976'";
    
    db.query(q,(err, data) => {
        if (err)
            return res.json(err)//return res.json(err);
        else if(!res.json(data.length))
            return req.json(false)
        else
            return res.json(data);
    });
    const n = 'AKASH'
    const p = '2004976'
    const q = "SELECT * FROM login_detail WHERE user_name= ? and password =?"
    db.query(q,[n, p],(err, data) => {
        if (err)
            return res.json(err);
        else if(data.length==0)
            return false;
        else    
            return true;
    });
    */
});

app.get("/c", (req, res) => {
    const q = "SELECT * FROM customer_details";
    db.query(q, (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});

app.post("/l", (req, res) => {
    const q = "INSERT INTO customer_details (`customer_name`, `customer_mobile`) VALUES (?)";
    const values = [
        req.body.user_name,
        req.body.mobile_no
    ];

    db.query(q, [values], (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});
app.post("/", (req, res) => {
    //a = req.session;
    req.session.save();
    const n = req.body.user_name;
    const p = req.body.password
    const q = "SELECT * FROM login_detail WHERE user_name=? and password=?";

    db.query(q,[n,p],(err, data) => {
        if (err){
            return res.json(0);
        }else if(data.length == 0){
            return res.json(1);
        }else{
        req.session.user_id =data[0].id;//data[0].id;
        console.log(req.session.user_id)
        req.session.isLoggedIn = true;
        
        //console.log("Session value set:", data[0].id);
        return res.json(2)
        //return res.json(data);
        }
    });
});
app.get('/checkSession', (req, res) => {
    console.log("Session value set checksession:", req.session.user_id);
    //if (a.cookie.maxAge>0) 
    if(req.session.isLoggedIn)
    {
      return res.json({ isLoggedIn: true, user: req.session.user_id });
    } else {
      return res.json({ isLoggedIn: false });
    }
  });
  
app.post("/d", (req, res) => {
    const q = "DELETE FROM customer_details WHERE id = ?";
    const values = [req.body.c_id];

    db.query(q, values,(err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Logout',(req,res)=>
    {
        //console.log(req.session.user_id);
       //a.cookie.maxAge = 0;
        req.session.destroy(err=>
            {
                if(err)
                    {
                        return res.json({ success: false, message: 'Logout failed' });
                    }
                else {
                        return res.json({ success: true, message: 'Logout successful' });
                    }
            })
    })


app.get("/dashboard", (req, res) => 
{
    const U_ID = req.session.user_id;
    const q = "SELECT * FROM customer_details WHERE u_id =? ";
    db.query(q,[U_ID], (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});
app.post("/Register",(req,res)=>
    {
        const q = "INSERT INTO login_detail (`name`, `mobile_no`,`email`,`user_name`,`password`) VALUES (?)";
        const val = [
            req.body.name,
            req.body.mobile_no,
            req.body.email,
            req.body.user_name,
            req.body.password
        ];
        console.log(val);
        db.query(q,[val],(err,data)=>{
            if (err) 
                return res.json(err);
            return res.json(data);

        })
        
    });
app.listen(3000, () => {
    console.log("HELLO 1");
});

/*

*/